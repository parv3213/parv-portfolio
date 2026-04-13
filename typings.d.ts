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
  /** URL to a hosted resume PDF. Add as a 'url' field in the Sanity pageInfo schema. */
  resumeUrl?: string
}

export interface Skill extends SanityBody {
  _type: 'skill'
  title: string
  image: Image
  category?: string
}

export interface Project extends SanityBody {
  _type: 'project'
  image?: Image
  summary: string
  title: string
  linkToBuild?: string
  linkToGithub?: string
  impactRank?: number
  technologies?: Skill[]
  architectureDetails?: any[]
  challengesAndTradeoffs?: any[]
}

export interface Achievement extends SanityBody {
  _type: 'achievement'
  title: string
  image: Image
  description: string
  linkToAsset?: string
}

export interface Technology extends SanityBody {
  _type: 'skill'
  title: string
  image: Image
}

export interface Experience extends SanityBody {
  _type: 'experience'
  company: string
  companyImage: CompanyImage
  dateStarted: string
  dateEnded: string
  isCurrentlyWorkingHere: boolean
  jobTitle: string
  /** Shown on the card; falls back to first point if omitted */
  summary?: string
  points: string[]
  technologies: Technology[]
  companyUrl: string
}
