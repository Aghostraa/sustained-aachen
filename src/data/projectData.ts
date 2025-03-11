import { Project } from '../components/project/ProjectHero';

export const projectsData: Record<string, Project> = {
  baumschutzbund: {
    id: 'baumschutzbund',
    title: 'Aachener Baumschutzbund',
    iconText: 'AB',
    iconColor: '#34d399', // Green color for environmental focus
    description: 'Dedicated to the preservation and expansion of urban tree canopy in Aachen, advocating for stronger tree protection policies and community engagement.',
    longDescription: 'The Aachener Baumschutzbund is committed to protecting and expanding the urban tree canopy in Aachen. Our organization focuses on advocating for stronger tree protection policies, organizing community tree planting events, and raising awareness about the importance of urban trees for climate resilience and biodiversity.\n\nWe face several key challenges that we are actively working to address. Sustainable funding remains a significant concern, as many of our activities require consistent financial support. We are also dedicated to improving our outreach strategies to engage more citizens, particularly younger residents who represent the future of environmental advocacy in our city.\n\nOne of our primary goals is to establish better connections with other environmental initiatives, especially newer projects that bring fresh perspectives to urban sustainability. We believe that transparent and effective communication between environmental groups in Aachen is essential for creating a coordinated approach to addressing climate challenges.',
    creator: 'Aachener Baumschutzbund',
    date: 'Established over 6 years ago',
    tags: ['Environmental Protection', 'Urban Forestry', 'Community Engagement', 'Advocacy'],
    amountRaised: 3250.00,
    contributors: 85,
    daysToGo: 0, // Ongoing initiative
    targetAmount: 10000,
    gallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
      'https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    sdgAlignment: [
      { number: 11, name: 'Sustainable Cities', color: '#f99d26' },
      { number: 13, name: 'Climate Action', color: '#48773e' },
      { number: 15, name: 'Life on Land', color: '#5bbb46' }
    ],
    outcomes: [
      'Planted over 500 trees in urban Aachen',
      'Advocated for stronger tree protection ordinances',
      'Conduct regular educational workshops on urban forestry',
      'Developed urban tree inventory and monitoring system'
    ],
    updates: [
      {
        date: 'March 15, 2025',
        title: 'Spring Planting Campaign',
        content: 'Successfully completed our spring planting campaign with 50 new trees planted in underserved neighborhoods.'
      },
      {
        date: 'February 10, 2025',
        title: 'New Partnership Announcement',
        content: 'We\'re excited to announce a new partnership with RWTH Aachen University to develop a comprehensive urban tree monitoring program.'
      }
    ],
    volunteerOpportunities: [
      {
        title: 'Tree Planting Coordinator',
        description: 'Help organize community tree planting events throughout Aachen.',
        hoursPerMonth: '8-10',
        spots: 2
      },
      {
        title: 'Outreach Specialist',
        description: 'Assist with social media, community engagement, and connecting with younger audiences.',
        hoursPerWeek: '3-5',
        spots: 3
      },
      {
        title: 'Inter-Initiative Liaison',
        description: 'Help build and maintain connections with other environmental projects in Aachen.',
        hoursPerMonth: '5-8',
        spots: 1
      }
    ],
    team: [
      {
        initials: 'JM',
        name: 'Johannes Müller',
        role: 'Project Lead'
      },
      {
        initials: 'LK',
        name: 'Lena Krause',
        role: 'Community Outreach'
      },
      {
        initials: 'TW',
        name: 'Thomas Weber',
        role: 'Advocacy Coordinator'
      }
    ],
    similarProjects: [
      {
        id: 'uniurbanmobil',
        title: 'Uni.Urban.Mobil. e.V.',
        iconText: 'UUM',
        iconColor: '#3b82f6',
        description: 'Focused on sustainable mobility, urban gardening, and environmental protection in Aachen.',
        amountRaised: 850.00,
        contributors: 25,
        targetAmount: 1000,
        progressPercentage: 85
      },
      {
        id: 'nachhaltigangezogen',
        title: 'nAChhaltig angezogen',
        iconText: 'NA',
        iconColor: '#8b5cf6',
        description: 'Promoting sustainable fashion, waste reduction, and environmental education in Aachen.',
        amountRaised: 750.00,
        contributors: 30,
        targetAmount: 1000,
        progressPercentage: 75
      }
    ],
    challenges: [
      {
        title: 'Sustainable Funding',
        description: 'Our tree planting and maintenance activities require consistent financial support, which has been challenging to secure on a long-term basis. We need to develop more sustainable funding models beyond grant cycles.',
        severity: 'high',
        status: 'active'
      },
      {
        title: 'Volunteer Retention',
        description: 'While we have good initial volunteer interest, we struggle to maintain long-term engagement, particularly with younger participants who have competing priorities and limited time availability.',
        severity: 'medium',
        status: 'addressing'
      },
      {
        title: 'Cross-Generation Communication',
        description: 'Our established organization sometimes struggles to effectively communicate with newer environmental initiatives that use different platforms and engagement strategies.',
        severity: 'medium',
        status: 'addressing'
      },
      {
        title: 'Administrative Burden',
        description: 'Managing administrative tasks, including grant reporting, volunteer coordination, and regulatory compliance, takes significant time away from our core environmental work.',
        severity: 'high',
        status: 'active'
      }
    ],
    resourcesNeeded: [
      {
        type: 'funding',
        description: 'Financial support for our ongoing tree planting program in underserved neighborhoods',
        urgency: 'high',
        quantity: '€5,000'
      },
      {
        type: 'volunteer',
        description: 'Digital marketing expertise to improve our online presence and reach younger audiences',
        urgency: 'medium',
        quantity: '5-10 hours/month'
      },
      {
        type: 'expertise',
        description: 'Grant writing and fundraising strategy development to secure more sustainable funding',
        urgency: 'high'
      },
      {
        type: 'materials',
        description: 'Tree care supplies including mulch, stakes, and protective casing for newly planted trees',
        urgency: 'medium',
        quantity: 'Supplies for 100 trees'
      }
    ],
    collaborationOpportunities: [
      {
        title: 'Joint Urban Ecology Workshop Series',
        description: 'We are seeking to partner with other environmental initiatives to co-create a workshop series connecting tree protection to broader ecological concerns.',
        benefitsToBoth: [
          'Shared audience and increased reach',
          'Diverse expertise creates richer educational content',
          'Shared costs and volunteer resources',
          'Building stronger community connections across initiatives'
        ],
        skillsNeeded: [
          'Educational Design',
          'Workshop Facilitation',
          'Marketing',
          'Venue Access'
        ],
        timeframe: 'Planning in Q2 2025, implementation Q3-Q4 2025',
        contactPerson: 'Lena Krause'
      },
    ],
    impactMetrics: [
      {
        name: 'Trees Planted',
        description: 'Number of trees successfully planted and established in urban Aachen',
        currentValue: 512,
        targetValue: 1000,
        unit: '',
        lastUpdated: 'March 15, 2025'
      },
      {
        name: 'Volunteer Engagement',
        description: 'Total volunteer hours contributed to tree planting and maintenance',
        currentValue: 1750,
        targetValue: 5000,
        unit: ' hours',
        lastUpdated: 'February 28, 2025'
      },
      {
        name: 'Carbon Sequestration',
        description: 'Estimated carbon dioxide sequestered by planted trees',
        currentValue: 25.6,
        targetValue: 50,
        unit: ' tons/year',
        lastUpdated: 'January 10, 2025'
      },
      {
        name: 'Public Workshops',
        description: 'Educational workshops conducted on urban forestry and tree care',
        currentValue: 24,
        targetValue: 40,
        unit: '',
        lastUpdated: 'March 1, 2025'
      }
    ],
    generationalFocus: 'established',
    governanceStructure: 'Registered non-profit with elected board',
    fundingSources: ['Municipal Grants', 'Private Donations', 'Membership Fees', 'Corporate Sponsorships'],
    knowledgeResources: [
      {
        title: 'Urban Tree Selection Guide',
        url: '#',
        description: 'A comprehensive guide to selecting appropriate tree species for different urban conditions in Aachen.'
      },
      {
        title: 'Tree Care Volunteer Training Materials',
        url: '#',
        description: 'Complete set of training materials for volunteers participating in tree planting and maintenance activities.'
      },
      {
        title: 'Funding Strategy Template',
        url: '#',
        description: 'Template and guidance for environmental initiatives seeking to diversify their funding sources.'
      }
    ]
  },
  
  aachenwasgeht: {
    id: 'aachenwasgeht',
    title: 'Aachen, was geht?!',
    iconText: 'AW',
    iconColor: '#f59e0b',
    description: 'A platform for educational work and community development in Aachen, connecting people with sustainable local events and initiatives.',
    longDescription: 'Aachen, was geht?! is a dynamic initiative dedicated to educational work and community development in Aachen. Founded between 1-3 years ago, we serve as a hub connecting residents with sustainable local events, initiatives, and community-building opportunities throughout the city.\n\nWith annual operating costs exceeding €50,000, our initiative is primarily funded through governmental grants and membership fees. We organize more than 20 events annually, ranging from educational workshops to community networking opportunities and skills-building sessions.\n\nOne of our primary challenges is securing sustainable financial resources to support our extensive programming. We actively use various incentives to encourage participation, including certificates and badges for participants, regular networking events to build community connections, and specialized workshops that help develop valuable skills within our community.',
    creator: '0x82a...b93F',
    date: 'Established 1-3 years ago',
    tags: ['Community Development', 'Education', 'Local Events', 'Networking'],
    amountRaised: 35000.00,
    contributors: 120,
    daysToGo: 60,
    targetAmount: 50000,
    gallery: [
      'https://images.unsplash.com/photo-1560439513-74b037a25d84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1540317700647-ec69694d70d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
    ],
    sdgAlignment: [
      { number: 4, name: 'Quality Education', color: '#c5192d' },
      { number: 11, name: 'Sustainable Cities', color: '#f99d26' },
      { number: 17, name: 'Partnerships', color: '#19486a' }
    ],
    outcomes: [
      'Create a comprehensive digital platform for community initiatives',
      'Host 20+ educational events annually',
      'Build a network of 500+ engaged community members',
      'Facilitate 15+ cross-initiative collaborations annually'
    ],
    updates: [
      {
        date: 'March 10, 2025',
        title: 'Platform Expansion',
        content: 'We\'ve successfully expanded our digital platform to include interactive maps of sustainable initiatives across Aachen.'
      },
      {
        date: 'February 25, 2025',
        title: 'New Funding Success',
        content: 'We\'re pleased to announce we\'ve secured additional funding from the city of Aachen to support our educational programming for the coming year.'
      }
    ],
    volunteerOpportunities: [
      {
        title: 'Event Manager',
        description: 'Help plan and execute community events and educational workshops.',
        hoursPerMonth: '15-20',
        spots: 3
      },
      {
        title: 'Digital Content Creator',
        description: 'Support our online presence through content creation and social media management.',
        hoursPerWeek: '5-8',
        spots: 2
      },
      {
        title: 'Community Liaison',
        description: 'Build relationships with other local initiatives and help coordinate collaborative projects.',
        hoursPerMonth: '10-12',
        spots: 2
      }
    ],
    team: [
      {
        initials: 'JP',
        name: 'Ja Pfeiffer',
        role: 'Founder'
      },
      {
        initials: 'MK',
        name: 'Miriam Klein',
        role: 'Education Director'
      },
      {
        initials: 'DH',
        name: 'Daniel Hoffmann',
        role: 'Community Manager'
      }
    ],
    similarProjects: [
      {
        id: 'baumschutzbund',
        title: 'Aachener Baumschutzbund',
        iconText: 'AB',
        iconColor: '#34d399',
        description: 'Dedicated to urban tree protection and community engagement in Aachen.',
        amountRaised: 3250.00,
        contributors: 85,
        targetAmount: 10000,
        progressPercentage: 32.5
      },
      {
        id: 'nachhaltigangezogen',
        title: 'nAChhaltig angezogen',
        iconText: 'NA',
        iconColor: '#8b5cf6',
        description: 'Promoting sustainable fashion, waste reduction, and environmental education in Aachen.',
        amountRaised: 750.00,
        contributors: 30,
        targetAmount: 1000,
        progressPercentage: 75
      }
    ],
    challenges: [
      {
        title: 'Funding Sustainability',
        description: 'While we currently receive governmental grants, we need to diversify our funding sources for long-term sustainability.',
        severity: 'high',
        status: 'active'
      },
      {
        title: 'Community Visibility',
        description: 'Despite our activities, we still struggle to reach all segments of the Aachen community.',
        severity: 'medium',
        status: 'addressing'
      }
    ],
    resourcesNeeded: [
      {
        type: 'expertise',
        description: 'Fundraising and grant writing expertise to help secure additional funding sources',
        urgency: 'high'
      },
      {
        type: 'volunteer',
        description: 'Community outreach volunteers to help expand our presence throughout Aachen',
        urgency: 'medium',
        quantity: '10-15 hours/month'
      }
    ],
    collaborationOpportunities: [
      {
        title: 'Cross-Initiative Events Calendar',
        description: 'We want to create a shared events calendar with other initiatives to better coordinate and promote sustainable activities in Aachen.',
        benefitsToBoth: [
          'Reduced scheduling conflicts',
          'Increased visibility for all events',
          'Shared promotion resources',
          'Better community engagement through coordinated offerings'
        ],
        skillsNeeded: [
          'Web Development',
          'Event Planning',
          'Marketing',
          'Community Management'
        ],
        timeframe: 'Launch by Q3 2025',
        contactPerson: 'Daniel Hoffmann'
      }
    ],
    impactMetrics: [
      {
        name: 'Community Events',
        description: 'Number of community events organized',
        currentValue: 32,
        targetValue: 50,
        unit: '',
        lastUpdated: 'March 1, 2025'
      },
      {
        name: 'Participant Engagement',
        description: 'Total number of participants at events',
        currentValue: 1250,
        targetValue: 2500,
        unit: '',
        lastUpdated: 'March 1, 2025'
      }
    ],
    generationalFocus: 'both',
    governanceStructure: 'Community-led with steering committee',
    fundingSources: ['Government Grants', 'Membership Fees', 'Event Revenue'],
    knowledgeResources: [
      {
        title: 'Community Event Planning Guide',
        url: '#',
        description: 'A comprehensive guide to planning and executing successful community sustainability events.'
      }
    ]
  },
  
  uniurbanmobil: {
    id: 'uniurbanmobil',
    title: 'Uni.Urban.Mobil. e.V.',
    iconText: 'UUM',
    iconColor: '#3b82f6',
    description: 'A volunteer-driven initiative focused on sustainable mobility, urban gardening, and environmental protection in Aachen.',
    longDescription: 'Uni.Urban.Mobil. e.V. is a volunteer-driven organization established 4-6 years ago that focuses on sustainable mobility, urban gardening, and environmental protection in Aachen. Our initiative operates on a small budget of under €1,000 annually, primarily funded through membership fees and private donations.\n\nDespite our modest financial resources, we are deeply committed to promoting sustainable transportation options throughout Aachen, supporting urban gardening initiatives, and advocating for environmental protection measures. We currently organize fewer than 5 events per year, focusing on quality and impact rather than quantity.\n\nOur most significant challenge is increasing public awareness about our initiatives. We\'re constantly working to improve our outreach strategies and visibility within the community. While we currently don\'t utilize formal incentives to encourage participation, we recognize the importance of showing participants the tangible impacts of their actions and are considering implementing more structured communication tools that would help coordinate our activities.',
    creator: 'Sebastian Lukas',
    date: 'Established 4-6 years ago',
    tags: ['Sustainable Mobility', 'Urban Gardening', 'Environmental Protection'],
    amountRaised: 850.00,
    contributors: 25,
    daysToGo: 90,
    targetAmount: 1000,
    gallery: [
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1572781068319-05c67ae74dae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1512&q=80',
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    sdgAlignment: [
      { number: 11, name: 'Sustainable Cities', color: '#f99d26' },
      { number: 13, name: 'Climate Action', color: '#48773e' },
      { number: 15, name: 'Life on Land', color: '#5bbb46' }
    ],
    outcomes: [
      'Promote alternative mobility solutions in Aachen',
      'Support 3+ urban gardening initiatives',
      'Develop educational materials on sustainable mobility',
      'Create stronger partnerships with university sustainability groups'
    ],
    updates: [
      {
        date: 'March 5, 2025',
        title: 'New Urban Garden Project',
        content: 'We\'ve secured a new location for a community urban garden near the university campus and are planning the initial setup phase.'
      },
      {
        date: 'January 15, 2025',
        title: 'Mobility Survey Completed',
        content: 'We\'ve completed our annual sustainable mobility survey with 250 participants, providing valuable insights for our advocacy work.'
      }
    ],
    volunteerOpportunities: [
      {
        title: 'Urban Garden Coordinator',
        description: 'Help establish and maintain our new community garden project.',
        hoursPerWeek: '2-4',
        spots: 3
      },
      {
        title: 'Mobility Advocate',
        description: 'Support our sustainable transportation initiatives through research and community engagement.',
        hoursPerMonth: '4-6',
        spots: 2
      },
      {
        title: 'Communications Specialist',
        description: 'Improve our public outreach and awareness through strategic communications.',
        hoursPerMonth: '3-5',
        spots: 1
      }
    ],
    team: [
      {
        initials: 'SL',
        name: 'Sebastian Lukas',
        role: 'Volunteer Coordinator'
      },
      {
        initials: 'MH',
        name: 'Maria Hausmann',
        role: 'Urban Garden Lead'
      },
      {
        initials: 'KN',
        name: 'Kai Neumann',
        role: 'Sustainable Mobility Expert'
      }
    ],
    similarProjects: [
      {
        id: 'baumschutzbund',
        title: 'Aachener Baumschutzbund',
        iconText: 'AB',
        iconColor: '#34d399',
        description: 'Dedicated to urban tree protection and community engagement in Aachen.',
        amountRaised: 3250.00,
        contributors: 85,
        targetAmount: 10000,
        progressPercentage: 32.5
      },
      {
        id: 'aachenwasgeht',
        title: 'Aachen, was geht?!',
        iconText: 'AW',
        iconColor: '#f59e0b',
        description: 'Platform for educational work and community development in Aachen.',
        amountRaised: 35000.00,
        contributors: 120,
        targetAmount: 50000,
        progressPercentage: 70
      }
    ],
    challenges: [
      {
        title: 'Limited Budget',
        description: 'Our small budget constrains our ability to implement larger mobility initiatives.',
        severity: 'high',
        status: 'active'
      },
      {
        title: 'Volunteer Capacity',
        description: 'As a volunteer-driven organization, we have limited time and capacity to manage multiple projects.',
        severity: 'medium',
        status: 'addressing'
      }
    ],
    resourcesNeeded: [
      {
        type: 'funding',
        description: 'Seed funding for new urban gardening project near university campus',
        urgency: 'high',
        quantity: '€2,000'
      },
      {
        type: 'space',
        description: 'Meeting and workshop space for community education events',
        urgency: 'medium'
      }
    ],
    collaborationOpportunities: [
      {
        title: 'Sustainable Transportation Initiative',
        description: 'Partnership with other mobility-focused groups to develop comprehensive transportation alternatives for students and faculty.',
        benefitsToBoth: [
          'Increased impact through coordinated efforts',
          'Shared expertise and resources',
          'Stronger voice in advocacy',
          'Broader community reach'
        ],
        skillsNeeded: [
          'Transportation Planning',
          'Policy Advocacy',
          'Community Outreach',
          'Data Analysis'
        ],
        timeframe: 'Ongoing throughout 2025',
        contactPerson: 'Sebastian Lukas'
      }
    ],
    impactMetrics: [
      {
        name: 'Sustainable Mobility Adoption',
        description: 'Percentage of university community using sustainable transportation',
        currentValue: 35,
        targetValue: 60,
        unit: '%',
        lastUpdated: 'February 15, 2025'
      },
      {
        name: 'Urban Garden Plots',
        description: 'Number of active urban garden plots maintained',
        currentValue: 12,
        targetValue: 30,
        unit: '',
        lastUpdated: 'March 5, 2025'
      }
    ],
    generationalFocus: 'emerging',
    governanceStructure: 'Volunteer collective with rotating leadership',
    fundingSources: ['Membership Fees', 'Private Donations'],
    knowledgeResources: [
      {
        title: 'Urban Gardening Starter Guide',
        url: '#',
        description: 'Practical guide for starting and maintaining urban garden plots in Aachen.'
      }
    ]
  },
  
  nachhaltigangezogen: {
    id: 'nachhaltigangezogen',
    title: 'nAChhaltig angezogen',
    iconText: 'NA',
    iconColor: '#8b5cf6',
    description: 'An initiative focused on sustainable fashion, waste reduction, and environmental education in Aachen.',
    longDescription: 'nAChhaltig angezogen is a grassroots initiative established 4-6 years ago, focusing on sustainable fashion, waste reduction, and environmental education in Aachen. Founded by humanities students, our organization operates on a modest budget of under €1,000 annually, primarily through governmental grants.\n\nWe organize between 5-10 events yearly, ranging from clothing swaps and repair workshops to educational seminars on the environmental impact of the fashion industry. Our approach combines practical waste reduction strategies with broader environmental protection education.\n\nOur most significant challenge is recruiting new participants and volunteers. We continuously work to improve our outreach strategies while maintaining a clear focus on our core mission of promoting sustainable fashion choices and reducing textile waste. Currently, we don\'t utilize formal incentives for participation but recognize the potential value of a platform that could help better organize our activities and track our environmental impact.',
    creator: '0x45c...d76E',
    date: 'Established 4-6 years ago',
    tags: ['Sustainable Fashion', 'Waste Reduction', 'Environmental Education'],
    amountRaised: 750.00,
    contributors: 30,
    daysToGo: 45,
    targetAmount: 1000,
    gallery: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    sdgAlignment: [
      { number: 12, name: 'Responsible Consumption', color: '#bf8b2e' },
      { number: 13, name: 'Climate Action', color: '#48773e' },
      { number: 4, name: 'Quality Education', color: '#c5192d' }
    ],
    outcomes: [
      'Organize 8+ clothing exchange events annually',
      'Divert 1000+ kg of textiles from landfills',
      'Educate 500+ citizens on sustainable fashion',
      'Create a sustainable fashion network in Aachen'
    ],
    updates: [
      {
        date: 'March 12, 2025',
        title: 'Spring Clothing Swap Success',
        content: 'Our recent clothing swap event attracted over 75 participants and diverted approximately 120kg of textiles from landfills.'
      },
      {
        date: 'February 5, 2025',
        title: 'New Educational Workshop Series',
        content: 'We\'ve launched a new workshop series on sustainable textile choices and repair techniques, with our first session fully booked.'
      }
    ],
    volunteerOpportunities: [
      {
        title: 'Event Organizer',
        description: 'Help plan and execute our clothing swap events and repair workshops.',
        hoursPerMonth: '6-10',
        spots: 3
      },
      {
        title: 'Education Coordinator',
        description: 'Develop and deliver educational content on sustainable fashion and textile waste.',
        hoursPerMonth: '8-12',
        spots: 2
      },
      {
        title: 'Outreach Specialist',
        description: 'Improve our recruitment strategies and help attract new participants.',
        hoursPerWeek: '2-3',
        spots: 2
      }
    ],
    team: [
      {
        initials: 'JS',
        name: 'Julia Schmidt',
        role: 'Founder'
      },
      {
        initials: 'AK',
        name: 'Anna Koch',
        role: 'Events Coordinator'
      },
      {
        initials: 'LB',
        name: 'Lisa Bauer',
        role: 'Education Lead'
      }
    ],
    similarProjects: [
      {
        id: 'baumschutzbund',
        title: 'Aachener Baumschutzbund',
        iconText: 'AB',
        iconColor: '#34d399',
        description: 'Dedicated to urban tree protection and community engagement in Aachen.',
        amountRaised: 3250.00,
        contributors: 85,
        targetAmount: 10000,
        progressPercentage: 32.5
      },
      {
        id: 'aachenwasgeht',
        title: 'Aachen, was geht?!',
        iconText: 'AW',
        iconColor: '#f59e0b',
        description: 'Platform for educational work and community development in Aachen.',
        amountRaised: 35000.00,
        contributors: 120,
        targetAmount: 50000,
        progressPercentage: 70
      }
    ],
    challenges: [
      {
        title: 'Market Adoption',
        description: 'Convincing consumers to choose sustainable fashion options despite potentially higher prices.',
        severity: 'high',
        status: 'active'
      },
      {
        title: 'Supply Chain Transparency',
        description: 'Ensuring true sustainability throughout complex global supply chains.',
        severity: 'medium',
        status: 'addressing'
      }
    ],
    resourcesNeeded: [
      {
        type: 'expertise',
        description: 'Marketing expertise to better communicate the value of sustainable fashion',
        urgency: 'high'
      },
      {
        type: 'volunteer',
        description: 'Event volunteers for upcoming sustainable fashion showcase',
        urgency: 'medium',
        quantity: '10 volunteers'
      }
    ],
    collaborationOpportunities: [
      {
        title: 'Circular Fashion Initiative',
        description: 'Developing a community-based clothing exchange and upcycling program.',
        benefitsToBoth: [
          'Reduced textile waste',
          'Increased community engagement',
          'Practical educational opportunities',
          'Shared resources and audience'
        ],
        skillsNeeded: [
          'Textile Knowledge',
          'Event Organization',
          'Upcycling Skills',
          'Community Outreach'
        ],
        timeframe: 'Launch in Q4 2025',
        contactPerson: 'Marie Schmidt'
      }
    ],
    impactMetrics: [
      {
        name: 'Waste Reduction',
        description: 'Kilograms of textile waste diverted from landfill',
        currentValue: 350,
        targetValue: 1000,
        unit: 'kg',
        lastUpdated: 'February 20, 2025'
      },
      {
        name: 'Workshop Participants',
        description: 'Number of participants in sustainable fashion workshops',
        currentValue: 175,
        targetValue: 500,
        unit: '',
        lastUpdated: 'March 10, 2025'
      }
    ],
    generationalFocus: 'emerging',
    governanceStructure: 'Student-led initiative',
    fundingSources: ['University Funding', 'Workshop Fees', 'Online Sales'],
    knowledgeResources: [
      {
        title: 'Sustainable Fabric Guide',
        url: '#',
        description: 'Comprehensive guide to sustainable fabric options and their environmental impacts.'
      }
    ]
  }
}; 