const store = {
  totalProjects: 0,
  offset: 0,
  limit: 10,
  projects: new Set,
  programmingLanguages: [
    'Python',
    'Swift',
    'Java',
    'CSS',
    'JavaScript',
    'TypeScript',
    'Shell',
    'Terraform'
  ],
  topProgrammingLanguages: [
    'Java',
    'Python',
    'Typescript',
    'Terraform'
  ],
  organisations: [
   'marksandspencer',
   'DigitalInnovation'
  ],
  path: '',
  
  setLimit(value) {
    this.limit = value;
  },

  setPath(value) {
    this.path = value;
  }
};
