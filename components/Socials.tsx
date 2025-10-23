import Link from "next/link"
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa"

interface SocialItem {
  icon: React.ReactNode;
  path: string;
}

const socials: SocialItem[] =  [
  { icon: <FaGithub />, path: ''},
  { icon: <FaLinkedin />, path: '' },
  { icon: <FaYoutube />, path: '' },
  { icon: <FaTwitter />, path: '' },
]

interface SocialsProps {
  containerStyles: string;
  iconStyles: string;
}

const Socials: React.FC<SocialsProps> = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return(
          <Link
            key={index}
            href={item.path}
            className={iconStyles}
          >
            {item.icon}
          </Link>
        )
      })}
    </div>
  )
}

export default Socials