import React, { createContext, useContext, useState, useEffect } from 'react';
import { Creator, Project, PortfolioItem, Application, ProjectStatus, ApplicationStatus } from '../types';
import { INITIAL_CREATORS, INITIAL_PROJECTS } from '../data/initialData';
import { useAuth } from './AuthContext';

interface MarketplaceContextType {
  creators: Creator[];
  projects: Project[];
  savedCreatorIds: string[];
  draftBrief: any | null;
  addProject: (project: Omit<Project, 'id' | 'postedDate' | 'applications'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  updateProjectStatus: (projectId: string, newStatus: ProjectStatus, selectedCreatorId?: string, selectedCreatorName?: string) => void;
  submitApplication: (projectId: string, appData: { proposal: string; proposedRate: string; estimatedDeliveryDays: number; relevantPortfolioItem?: string }) => { success: boolean; message: string; application?: Application };
  updateApplicationStatus: (projectId: string, applicationId: string, status: ApplicationStatus) => void;
  toggleSaveCreator: (creatorId: string) => void;
  isCreatorSaved: (creatorId: string) => boolean;
  addPortfolioItem: (creatorId: string, item: Omit<PortfolioItem, 'id' | 'creatorId'>) => PortfolioItem;
  editPortfolioItem: (creatorId: string, itemId: string, itemUpdates: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (creatorId: string, itemId: string) => void;
  updateCreatorProfile: (creatorId: string, updates: Partial<Creator>) => void;
  saveDraftBrief: (draft: any) => void;
  clearDraftBrief: () => void;
  resetToSampleData: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // Initialize creators
  const [creators, setCreators] = useState<Creator[]>(() => {
    const saved = localStorage.getItem('creatorai_creators');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CREATORS;
      }
    }
    return INITIAL_CREATORS;
  });

  // Initialize projects
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('creatorai_projects_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PROJECTS;
      }
    }
    return INITIAL_PROJECTS;
  });

  // Saved / Bookmarked Creators
  const [savedCreatorIds, setSavedCreatorIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('creatorai_saved_creators');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ['creator-1', 'creator-3'];
      }
    }
    return ['creator-1', 'creator-3'];
  });

  // Draft brief for form pre-filling
  const [draftBrief, setDraftBrief] = useState<any | null>(() => {
    const saved = localStorage.getItem('creatorai_draft_brief');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('creatorai_creators', JSON.stringify(creators));
  }, [creators]);

  useEffect(() => {
    localStorage.setItem('creatorai_projects_v2', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('creatorai_saved_creators', JSON.stringify(savedCreatorIds));
  }, [savedCreatorIds]);

  useEffect(() => {
    if (draftBrief) {
      localStorage.setItem('creatorai_draft_brief', JSON.stringify(draftBrief));
    } else {
      localStorage.removeItem('creatorai_draft_brief');
    }
  }, [draftBrief]);

  // Project operations
  const addProject = (projectData: Omit<Project, 'id' | 'postedDate' | 'applications'>): Project => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      postedDate: 'Just now',
      applications: []
    };

    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const updateProjectStatus = (
    projectId: string,
    newStatus: ProjectStatus,
    selectedCreatorId?: string,
    selectedCreatorName?: string
  ) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status: newStatus,
          selectedCreatorId: selectedCreatorId !== undefined ? selectedCreatorId : p.selectedCreatorId,
          selectedCreatorName: selectedCreatorName !== undefined ? selectedCreatorName : p.selectedCreatorName
        };
      }
      return p;
    }));
  };

  // Applications
  const submitApplication = (
    projectId: string,
    appData: { proposal: string; proposedRate: string; estimatedDeliveryDays: number; relevantPortfolioItem?: string }
  ): { success: boolean; message: string; application?: Application } => {
    const targetProject = projects.find(p => p.id === projectId);
    if (!targetProject) {
      return { success: false, message: 'Project not found.' };
    }

    const currentCreatorId = user?.role === 'creator' ? user.id : 'creator-1';
    const currentCreator = creators.find(c => c.id === currentCreatorId) || creators[0];

    // Duplicate check
    const existingApp = targetProject.applications.find(a => a.creatorId === currentCreator.id);
    if (existingApp) {
      return {
        success: false,
        message: 'You have already submitted an application to this project brief.'
      };
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      projectId,
      projectTitle: targetProject.title,
      creatorId: currentCreator.id,
      creatorName: currentCreator.name,
      creatorAvatar: currentCreator.avatar,
      creatorTitle: currentCreator.title,
      proposal: appData.proposal,
      relevantPortfolioItem: appData.relevantPortfolioItem,
      proposedRate: appData.proposedRate,
      estimatedDeliveryDays: appData.estimatedDeliveryDays,
      status: 'Submitted',
      submittedAt: 'Just now'
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          applications: [newApp, ...p.applications]
        };
      }
      return p;
    }));

    return {
      success: true,
      message: 'Application submitted successfully to client.',
      application: newApp
    };
  };

  const updateApplicationStatus = (projectId: string, applicationId: string, status: ApplicationStatus) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedApps = p.applications.map(a => {
          if (a.id === applicationId) {
            return { ...a, status };
          }
          return a;
        });

        // If accepted, update project status to Creator Selected
        let newProjectStatus = p.status;
        let selectedCreatorId = p.selectedCreatorId;
        let selectedCreatorName = p.selectedCreatorName;

        if (status === 'Accepted') {
          newProjectStatus = 'Creator Selected';
          const targetApp = p.applications.find(a => a.id === applicationId);
          if (targetApp) {
            selectedCreatorId = targetApp.creatorId;
            selectedCreatorName = targetApp.creatorName;
          }
        }

        return {
          ...p,
          status: newProjectStatus,
          selectedCreatorId,
          selectedCreatorName,
          applications: updatedApps
        };
      }
      return p;
    }));
  };

  // Saved Creators (Shortlist)
  const toggleSaveCreator = (creatorId: string) => {
    setSavedCreatorIds(prev => {
      if (prev.includes(creatorId)) {
        return prev.filter(id => id !== creatorId);
      } else {
        return [...prev, creatorId];
      }
    });
  };

  const isCreatorSaved = (creatorId: string): boolean => {
    return savedCreatorIds.includes(creatorId);
  };

  // Creator Portfolio Item Operations
  const addPortfolioItem = (creatorId: string, item: Omit<PortfolioItem, 'id' | 'creatorId'>): PortfolioItem => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`,
      creatorId,
      createdAt: 'Just now'
    };

    setCreators(prev => prev.map(c => {
      if (c.id === creatorId) {
        return {
          ...c,
          portfolio: [newItem, ...c.portfolio]
        };
      }
      return c;
    }));

    return newItem;
  };

  const editPortfolioItem = (creatorId: string, itemId: string, itemUpdates: Partial<PortfolioItem>) => {
    setCreators(prev => prev.map(c => {
      if (c.id === creatorId) {
        return {
          ...c,
          portfolio: c.portfolio.map(item => item.id === itemId ? { ...item, ...itemUpdates } : item)
        };
      }
      return c;
    }));
  };

  const deletePortfolioItem = (creatorId: string, itemId: string) => {
    setCreators(prev => prev.map(c => {
      if (c.id === creatorId) {
        return {
          ...c,
          portfolio: c.portfolio.filter(item => item.id !== itemId)
        };
      }
      return c;
    }));
  };

  const updateCreatorProfile = (creatorId: string, updates: Partial<Creator>) => {
    setCreators(prev => prev.map(c => {
      if (c.id === creatorId) {
        return { ...c, ...updates };
      }
      return c;
    }));
  };

  const saveDraftBrief = (draft: any) => {
    setDraftBrief(draft);
  };

  const clearDraftBrief = () => {
    setDraftBrief(null);
  };

  const resetToSampleData = () => {
    setCreators(INITIAL_CREATORS);
    setProjects(INITIAL_PROJECTS);
    setSavedCreatorIds(['creator-1', 'creator-3']);
    setDraftBrief(null);
    localStorage.removeItem('creatorai_creators');
    localStorage.removeItem('creatorai_projects_v2');
    localStorage.removeItem('creatorai_saved_creators');
    localStorage.removeItem('creatorai_draft_brief');
  };

  return (
    <MarketplaceContext.Provider
      value={{
        creators,
        projects,
        savedCreatorIds,
        draftBrief,
        addProject,
        updateProject,
        updateProjectStatus,
        submitApplication,
        updateApplicationStatus,
        toggleSaveCreator,
        isCreatorSaved,
        addPortfolioItem,
        editPortfolioItem,
        deletePortfolioItem,
        updateCreatorProfile,
        saveDraftBrief,
        clearDraftBrief,
        resetToSampleData
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
