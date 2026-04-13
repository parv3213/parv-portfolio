import { ExternalLink, Mail } from 'lucide-react'
import React from 'react'
import { Social } from '../typings'

type Props = {
  social: Social
  className?: string
  size?: number
  color?: string
  children?: React.ReactNode
}

// Modern thinner SVGs for brands to match Lucide's aesthetic
const BrandIcons: Record<string, React.FC<{ size: number, color: string }>> = {
  github: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  linkedin: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  twitter: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  x: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  ),
  instagram: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  youtube: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2z" />
      <path d="m10 9 5 3-5 3V9z" />
    </svg>
  ),
  facebook: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
}

const SocialLink = ({ social, className, size = 20, color = 'currentColor', children }: Props) => {
  const getIcon = (url: string) => {
    const lowerUrl = url.toLowerCase()
    
    if (lowerUrl.includes('github.com')) return BrandIcons.github
    if (lowerUrl.includes('linkedin.com')) return BrandIcons.linkedin
    if (lowerUrl.includes('twitter.com')) return BrandIcons.twitter
    if (lowerUrl.includes('x.com')) return BrandIcons.x
    if (lowerUrl.includes('instagram.com')) return BrandIcons.instagram
    if (lowerUrl.includes('facebook.com')) return BrandIcons.facebook
    if (lowerUrl.includes('youtube.com')) return BrandIcons.youtube
    if (lowerUrl.includes('mailto:')) {
      const MailIcon = (props: any) => <Mail {...props} strokeWidth={1.5} />
      MailIcon.displayName = 'MailIcon'
      return MailIcon
    }
    
    const DefaultIcon = (props: any) => <ExternalLink {...props} strokeWidth={1.5} />
    DefaultIcon.displayName = 'DefaultIcon'
    return DefaultIcon
  }

  const IconComp = getIcon(social.url)

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.title}
      className={className}
    >
      <IconComp size={size} color={color} />
      {children}
    </a>
  )
}

export default SocialLink
