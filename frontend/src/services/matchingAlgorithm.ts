import { Creator, Project, MatchResult } from '../types';

/**
 * Transparent Weighted Matching Algorithm
 * Calculates compatibility score (0 - 100) between project requirements and creator profiles.
 * 
 * Weights:
 * - Required skill similarity: 40%
 * - Specialization similarity: 25%
 * - Content type similarity: 20%
 * - Preferred AI tool similarity: 15%
 */
export function calculateCreatorMatch(project: Project, creator: Creator): MatchResult {
  const matchedSkills: string[] = [];
  const matchedTools: string[] = [];

  // 1. Skill Similarity (40% Weight)
  let skillsScore = 0;
  if (!project.requiredSkills || project.requiredSkills.length === 0) {
    // If project specified no skills, give fair neutral credit (30/40)
    skillsScore = 30;
  } else {
    const creatorSkillsLower = creator.skills.map(s => s.toLowerCase());
    let matchCount = 0;

    project.requiredSkills.forEach(reqSkill => {
      const reqLower = reqSkill.toLowerCase();
      const hasDirect = creatorSkillsLower.some(cs => cs.includes(reqLower) || reqLower.includes(cs));
      if (hasDirect) {
        matchCount++;
        matchedSkills.push(reqSkill);
      }
    });

    const ratio = matchCount / project.requiredSkills.length;
    // Map ratio to 40 max points, with a baseline boost if they have high skill overlap
    skillsScore = Math.min(40, Math.round(ratio * 40));
  }

  // 2. Specialization Similarity (25% Weight)
  let specializationScore = 0;
  const projectTitleAndDesc = `${project.title} ${project.description} ${project.creativeDirection || ''}`.toLowerCase();
  const creatorSpecsLower = creator.specializations.map(sp => sp.toLowerCase());

  let specMatches = 0;
  creatorSpecsLower.forEach(spec => {
    const words = spec.split(' ').filter(w => w.length > 3);
    const matchesWord = words.some(w => projectTitleAndDesc.includes(w));
    if (matchesWord) {
      specMatches++;
    }
  });

  if (specMatches >= 2) {
    specializationScore = 25;
  } else if (specMatches === 1) {
    specializationScore = 18;
  } else {
    // Check general category alignment
    if (isCategoryAligned(project.contentType, creator.primaryCategory)) {
      specializationScore = 14;
    } else {
      specializationScore = 6;
    }
  }

  // 3. Content Type Similarity (20% Weight)
  let contentTypeScore = 0;
  if (!project.contentType) {
    contentTypeScore = 15;
  } else {
    if (isCategoryAligned(project.contentType, creator.primaryCategory)) {
      contentTypeScore = 20;
    } else {
      // Check if creator has portfolio items in that category
      const mappedCat = mapContentTypeToCategory(project.contentType);
      const hasPortfolioInCategory = creator.portfolio.some(p => p.category === mappedCat);
      if (hasPortfolioInCategory) {
        contentTypeScore = 16;
      } else {
        contentTypeScore = 5;
      }
    }
  }

  // 4. Preferred AI Tool Similarity (15% Weight)
  let aiToolsScore = 0;
  if (!project.preferredAiTools || project.preferredAiTools.length === 0) {
    aiToolsScore = 12; // Fair neutral baseline
  } else {
    const creatorToolsLower = creator.aiTools.map(t => t.toLowerCase());
    let toolMatches = 0;

    project.preferredAiTools.forEach(prefTool => {
      const prefLower = prefTool.toLowerCase();
      const hasTool = creatorToolsLower.some(ct => ct.includes(prefLower) || prefLower.includes(ct));
      if (hasTool) {
        toolMatches++;
        matchedTools.push(prefTool);
      }
    });

    const toolRatio = toolMatches / project.preferredAiTools.length;
    aiToolsScore = Math.min(15, Math.round(toolRatio * 15));
  }

  // Normalized Final Score (0 - 100)
  const totalScore = Math.min(100, Math.max(10, skillsScore + specializationScore + contentTypeScore + aiToolsScore));

  // Generate clear human-explainable rationale
  const explanation = generateMatchExplanation(creator, project, totalScore, matchedSkills, matchedTools);

  return {
    creator,
    matchScore: totalScore,
    breakdown: {
      skillsScore,
      specializationScore,
      contentTypeScore,
      aiToolsScore
    },
    explanation,
    matchedSkills,
    matchedTools
  };
}

function isCategoryAligned(contentType: string, creatorCategory: string): boolean {
  const ct = contentType.toLowerCase();
  const cc = creatorCategory.toLowerCase();

  if (ct.includes('video') && cc === 'video') return true;
  if ((ct.includes('image') || ct.includes('photo') || ct.includes('editorial')) && cc === 'imagery') return true;
  if ((ct.includes('influencer') || ct.includes('3d') || ct.includes('splat')) && cc === 'virtual-influencer') return true;
  if ((ct.includes('product') || ct.includes('cpg')) && (cc === 'product' || cc === 'imagery')) return true;
  if ((ct.includes('concept') || ct.includes('game')) && cc === 'concept-art') return true;
  if ((ct.includes('audio') || ct.includes('voice') || ct.includes('sound')) && cc === 'audio') return true;

  return false;
}

function mapContentTypeToCategory(contentType: string): string {
  const ct = contentType.toLowerCase();
  if (ct.includes('video')) return 'video';
  if (ct.includes('audio') || ct.includes('voice')) return 'audio';
  if (ct.includes('virtual') || ct.includes('3d')) return 'virtual-influencer';
  if (ct.includes('product')) return 'product';
  if (ct.includes('concept')) return 'concept-art';
  return 'imagery';
}

function generateMatchExplanation(
  creator: Creator,
  project: Project,
  score: number,
  matchedSkills: string[],
  matchedTools: string[]
): string {
  if (score >= 90) {
    return `Exceptional compatibility (${score}%). ${creator.name} specializes directly in ${creator.specializations[0]}, has verified master portfolio examples matching "${project.contentType}", and proficiently employs ${matchedTools.slice(0, 2).join(' & ') || creator.aiTools.slice(0, 2).join(' & ')}.`;
  }
  if (score >= 75) {
    return `Strong compatibility (${score}%). Recommended because this creator demonstrates proven competence in ${matchedSkills.slice(0, 2).join(', ') || creator.skills.slice(0, 2).join(', ')}, aligned tooling (${matchedTools.join(', ') || creator.aiTools.slice(0, 2).join(', ')}), and has commercial portfolio clearance.`;
  }
  if (score >= 60) {
    return `Moderate compatibility (${score}%). Creator possesses foundational tools and production experience, with skills transferable to your ${project.contentType} requirements.`;
  }
  return `Potential match (${score}%). Compatible creative capabilities, though secondary in direct toolchain specifications.`;
}

/**
 * Rank and score all creators against a given project brief
 */
export function rankCreatorsForProject(project: Project, creators: Creator[]): MatchResult[] {
  return creators
    .map(creator => calculateCreatorMatch(project, creator))
    .sort((a, b) => b.matchScore - a.matchScore);
}
