document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.food-design-container');
    const items = document.querySelectorAll('.food-design-item');

    // Get container dimensions
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // To store occupied areas
    const occupiedPositions = [];

    // Function to check if a new position overlaps with existing ones
    const isOverlapping = (x, y, itemSize) => {
        return occupiedPositions.some(pos => {
            const dx = pos.x - x;
            const dy = pos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < itemSize; // Minimum spacing between items
        });
    };

    // Function to generate random positions with no overlap
    const getRandomPosition = (itemSize) => {
        let x, y;
        do {
            x = Math.floor(Math.random() * (containerWidth - itemSize));
            y = Math.floor(Math.random() * (containerHeight - itemSize));
        } while (isOverlapping(x, y, itemSize));
        occupiedPositions.push({ x, y });
        return { x, y };
    };

    // Randomize the position of each item
    items.forEach((item) => {
        const itemSize = item.offsetWidth; // Assuming square items
        const { x, y } = getRandomPosition(itemSize);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.position = 'absolute'; // Ensure absolute positioning
    });
});
