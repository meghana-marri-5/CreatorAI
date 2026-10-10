export type UserRole = 'creator' | 'brand' | 'guest';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'creator' | 'brand';
  avatar_url?: string;
  bio?: string;
  headline?: string;
  location?: string;
  company_name?: string;
}

export type VerificationStatus = 
  | 'Information Provided' 
  | 'Portfolio Submitted' 
  | 'Reviewed' 
  | 'Verified Master';

export interface CommercialInfo {
  clearanceLevel: string;
  summary: string;
  perpetualUsage: boolean;
  modelReleaseGuarantee: boolean;
  sourceFilesIncluded: boolean;
  licenseTag: string;
}

export interface WorkflowStep {
  step: string;
  desc: string;
}

export interface PortfolioItem {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  category: 'video' | 'imagery' | 'virtual-influencer' | 'product' | 'concept-art' | 'audio';
  thumbnailUrl: string;
  projectUrl?: string;
  aiTools: string[];
  workflowDescription?: string;
  creatorContribution?: string;
  promptSnippet?: string;
  licensingInformation?: string;
  createdAt?: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  hourlyRate: number;
  minProjectBudget?: number;
  avatar: string;
  coverImage?: string;
  badge: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  bio: string;
  primaryCategory: 'video' | 'imagery' | 'virtual-influencer' | 'product' | 'concept-art' | 'audio';
  specializations: string[];
  skills: string[];
  aiTools: string[];
  experienceLevel: 'Intermediate' | 'Senior' | 'Master';
  availability: 'Available' | 'Limited' | 'Booked';
  commercialInfo: CommercialInfo;
  workflow: WorkflowStep[];
  portfolio: PortfolioItem[];
}

export type ProjectStatus = 
  | 'Draft' 
  | 'Open' 
  | 'Reviewing Applications' 
  | 'Creator Selected' 
  | 'In Progress' 
  | 'Completed' 
  | 'Cancelled';

export type ApplicationStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'Accepted' 
  | 'Rejected' 
  | 'Withdrawn';

export interface Application {
  id: string;
  projectId: string;
  projectTitle?: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTitle?: string;
  proposal: string;
  relevantPortfolioItem?: string;
  estimatedDeliveryDays: number | string;
  proposedRate: string;
  status: ApplicationStatus;
  submittedAt: string;
}

export interface Project {
  id: string;
  brandId: string;
  brandName: string;
  brandAvatar?: string;
  title: string;
  description: string;
  businessObjective?: string;
  contentType: string;
  targetAudience?: string;
  creativeDirection?: string;
  requiredSkills: string[];
  preferredAiTools: string[];
  deliverables: string[];
  dimensionsOrDuration?: string;
  deadline: string;
  budgetMin?: number;
  budgetMax?: number;
  budgetDisplay: string;
  usagePlatforms: string[];
  commercialUseRequirements: string[];
  referenceLinks?: string[];
  status: ProjectStatus;
  selectedCreatorId?: string;
  selectedCreatorName?: string;
  postedDate: string;
  applications: Application[];
}

export interface MatchScoreBreakdown {
  skillsScore: number;       // out of 40%
  specializationScore: number; // out of 25%
  contentTypeScore: number;  // out of 20%
  aiToolsScore: number;      // out of 15%
}

export interface MatchResult {
  creator: Creator;
  matchScore: number;        // 0 to 100
  breakdown: MatchScoreBreakdown;
  explanation: string;
  matchedSkills: string[];
  matchedTools: string[];
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  industry: string;
  logo: string;
  coverImage?: string;
  website: string;
  location: string;
  companySize?: string;
  foundedYear?: string;
  verified: boolean;
  brandGuidelines?: string;
  preferredStyles?: string[];
  totalProjectsCount?: number;
  creatorsHiredCount?: number;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

