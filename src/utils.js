export function shuffleArray(arr){ //Fisher-Yates Shuffle
    for (let i = arr.length - 1; i > 0; i--) { 
    
        // Generate random index 
        const j = Math.floor(Math.random() * (i + 1));
                      
        // Swap elements at indices i and j
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
}
