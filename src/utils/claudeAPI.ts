
export interface ClaudeRecommendationResponse {
  recommendation: string;
  suggestedProducts: number[];
}

// This is a placeholder function that returns static recommendations
// The Claude API integration has been removed
export const getProductRecommendations = async (
  searchTerm: string,
  apiKey: string
): Promise<ClaudeRecommendationResponse> => {
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return static recommendations based on search term
    const term = searchTerm.toLowerCase();
    
    if (term.includes('electronic') || term.includes('tech') || term.includes('gadget')) {
      return {
        recommendation: "We found some great electronic products that match your search.",
        suggestedProducts: [1, 2, 5, 6]
      };
    } else if (term.includes('sport') || term.includes('fitness') || term.includes('exercise')) {
      return {
        recommendation: "Check out these sports and fitness items.",
        suggestedProducts: [3]
      };
    } else if (term.includes('cloth') || term.includes('wear') || term.includes('apparel')) {
      return {
        recommendation: "Here are some clothing items you might like.",
        suggestedProducts: [4]
      };
    } else if (term.includes('home') || term.includes('kitchen') || term.includes('house')) {
      return {
        recommendation: "These home products match your search.",
        suggestedProducts: [7]
      };
    } else if (term.includes('travel') || term.includes('bag') || term.includes('carry')) {
      return {
        recommendation: "Perfect accessories for your travels.",
        suggestedProducts: [8]
      };
    } else {
      // Default: return a mix of popular products
      return {
        recommendation: "Here are some popular products you might be interested in.",
        suggestedProducts: [1, 3, 6, 8]
      };
    }
    
  } catch (error) {
    console.error("Error with recommendations:", error);
    return { 
      recommendation: "Couldn't load recommendations at this time.", 
      suggestedProducts: [] 
    };
  }
};
