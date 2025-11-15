import { getToolsData, Tool } from '@/data/toolsConfig';

export function getRelatedTools(sourceToolId: string, limit: number = 5): Tool[] {
  const allTools = getToolsData();
  const sourceTool = allTools.find(tool => tool.id === sourceToolId);
  
  if (!sourceTool) {
    return allTools
      .filter(tool => !tool.isComingSoon && tool.id !== sourceToolId)
      .slice(0, limit);
  }

  const relatedTools = allTools
    .filter(tool => {
      if (tool.isComingSoon || tool.id === sourceToolId) return false;
      
      const sameCategoryScore = tool.category === sourceTool.category ? 3 : 0;
      
      const commonTags = tool.tags.filter(tag => 
        sourceTool.tags.some(sourceTag => 
          sourceTag.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(sourceTag.toLowerCase())
        )
      ).length;
      
      return sameCategoryScore + commonTags > 0;
    })
    .map(tool => {
      const sameCategoryScore = tool.category === sourceTool.category ? 3 : 0;
      const commonTags = tool.tags.filter(tag => 
        sourceTool.tags.some(sourceTag => 
          sourceTag.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(sourceTag.toLowerCase())
        )
      ).length;
      
      return {
        tool,
        relevanceScore: sameCategoryScore + commonTags
      };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit)
    .map(item => item.tool);

  if (relatedTools.length < limit) {
    const remainingTools = allTools
      .filter(tool => 
        !tool.isComingSoon && 
        tool.id !== sourceToolId && 
        !relatedTools.find(rt => rt.id === tool.id)
      )
      .slice(0, limit - relatedTools.length);
    
    relatedTools.push(...remainingTools);
  }

  return relatedTools;
}
