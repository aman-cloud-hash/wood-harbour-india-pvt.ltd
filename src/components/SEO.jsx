import { useEffect } from 'react';

export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    if (title) document.title = `${title} | Woodharbour India`;
    
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);
    }

    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);

  return null;
}
