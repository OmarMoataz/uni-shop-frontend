
export interface ClaudeRecommendationResponse {
  recommendation: string;
  suggestedProducts: number[];
}

// This function calls Claude API to get product recommendations
export const getProductRecommendations = async (
  searchTerm: string,
  apiKey: string
): Promise<ClaudeRecommendationResponse> => {
  try {
    // Use cors-anywhere proxy service to bypass CORS restrictions
    // Note: For production, you should set up your own proxy server
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const claudeApiUrl = 'https://api.anthropic.com/v1/messages';
    
    const response = await fetch(`${proxyUrl}${claudeApiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Origin": window.location.origin
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Based on the search term "${searchTerm}", recommend some relevant products from this product list:
            ${JSON.stringify(
              [
                { id: 1, name: "Wireless Headphones", category: "Electronics", price: 149.99 },
                { id: 2, name: "Smart Watch", category: "Electronics", price: 299.99 },
                { id: 3, name: "Running Shoes", category: "Sports", price: 89.99 },
                { id: 4, name: "Cotton T-Shirt", category: "Clothing", price: 24.99 },
                { id: 5, name: "Smartphone", category: "Electronics", price: 899.99 },
                { id: 6, name: "Laptop", category: "Electronics", price: 1299.99 },
                { id: 7, name: "Coffee Maker", category: "Home", price: 79.99 },
                { id: 8, name: "Backpack", category: "Accessories", price: 49.99 }
              ],
              null,
              2
            )}

            Format your response as valid JSON with these fields:
            - recommendation: A short paragraph explaining why these products match the search
            - suggestedProducts: An array of product IDs that match the search term
            
            Only include the JSON in your response, nothing else.`
          }
        ]
      })
    });

    const data = await response.json();
    const content = data.content?.[0]?.text || "{}";
    
    // Extract just the JSON part of the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : "{}";
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error fetching Claude recommendations:", error);
    
    // Add more detailed error logging
    if (error instanceof Response) {
      const errorText = await error.text();
      console.error("API response error:", errorText);
    }
    
    return { 
      recommendation: "Failed to get recommendations. Please check your API key or try again later.", 
      suggestedProducts: [] 
    };
  }
};

