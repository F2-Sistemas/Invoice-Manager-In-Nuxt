export default defineEventHandler(async () => {
    // TODO: Replace with database query when schema is created
    // For now, returning static product/service list
    const products = [
        {
            id: 1,
            name: 'Web Development',
            description: 'Full-stack web application development',
            unity: 'project',
            unitPrice: 5000,
            category: 'service',
        },
        {
            id: 2,
            name: 'Frontend Development',
            description: 'React/Vue frontend development',
            unity: 'hour',
            unitPrice: 150,
            category: 'service',
        },
        {
            id: 3,
            name: 'Backend Development',
            description: 'Node.js/PHP backend development',
            unity: 'hour',
            unitPrice: 150,
            category: 'service',
        },
        {
            id: 4,
            name: 'UI/UX Design',
            description: 'User interface and experience design',
            unity: 'project',
            unitPrice: 2000,
            category: 'service',
        },
        {
            id: 5,
            name: 'Database Design',
            description: 'Database architecture and optimization',
            unity: 'hour',
            unitPrice: 120,
            category: 'service',
        },
        {
            id: 6,
            name: 'Technical Consultation',
            description: 'Tech stack and architecture consultation',
            unity: 'hour',
            unitPrice: 200,
            category: 'service',
        },
        {
            id: 7,
            name: 'API Development',
            description: 'REST API development',
            unity: 'project',
            unitPrice: 3000,
            category: 'service',
        },
        {
            id: 8,
            name: 'Testing & QA',
            description: 'Automated and manual testing',
            unity: 'hour',
            unitPrice: 100,
            category: 'service',
        },
    ];

    return products;
});
