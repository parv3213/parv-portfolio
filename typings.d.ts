interface SanityBody {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}

interface Image {
  _type: string
  asset: {
    ref: string
    _type: string
  }
}

export interface Social extends SanityBody {
  _type: 'social'
  title: string
  url: string
}

export interface PageInfo extends SanityBody {
  _type: 'pageInfo'
  email: string
  heroImage: Image
  name: string
  profilePic: Image
  role: string
  socials: any[]
  backgroundInformation: string
}

export interface Skill extends SanityBody {
  _type: 'skill'
  title: string
  image: Image
  progress: number
}

export interface Project extends SanityBody {
  _type: 'project'
  image: Image
  summary: string
  title: string
  linkToBuild: string
}

export interface Technology extends SanityBody {
  _type: 'skill'
  title: string
  image: Image
  progress: number
}

export interface Experience extends SanityBody {
  _type: 'experience'
  company: string
  companyImage: CompanyImage
  dateStarted: string
  dateEnded: string
  isCurrentlyWorkingHere: boolean
  jobTitle: string
  points: string[]
  technologies: Technology[]
  companyUrl: string
}
