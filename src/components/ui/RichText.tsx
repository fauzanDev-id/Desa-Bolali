import React from 'react'

interface RichTextProps {
  content: any
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null

  // Jika string mentah
  if (typeof content === 'string') {
    return <div className={`prose prose-slate max-w-none text-slate-700 leading-relaxed ${className}`} dangerouslySetInnerHTML={{ __html: content }} />
  }

  // Jika Lexical format (memiliki root.children)
  const root = content?.root || content
  const children = root?.children

  if (!Array.isArray(children)) {
    return null
  }

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null

    // Text node
    if (node.type === 'text' || (!node.type && typeof node.text === 'string')) {
      let textElement: React.ReactNode = node.text

      // Format flags: 1 = bold, 2 = italic, 8 = underline, etc.
      if (node.format & 1 || node.bold) {
        textElement = <strong>{textElement}</strong>
      }
      if (node.format & 2 || node.italic) {
        textElement = <em>{textElement}</em>
      }
      if (node.format & 8 || node.underline) {
        textElement = <u>{textElement}</u>
      }

      return <React.Fragment key={index}>{textElement}</React.Fragment>
    }

    // Paragraph
    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-4 leading-relaxed text-slate-700 text-sm sm:text-base">
          {node.children?.map((child: any, cIdx: number) => renderNode(child, cIdx))}
        </p>
      )
    }

    // Headings
    if (node.type === 'heading') {
      const tag = node.tag || 'h3'
      const headingClasses = {
        h1: 'text-2xl sm:text-3xl font-extrabold text-desa-green-950 mt-6 mb-3',
        h2: 'text-xl sm:text-2xl font-bold text-desa-green-900 mt-5 mb-2.5',
        h3: 'text-lg sm:text-xl font-bold text-slate-900 mt-4 mb-2',
        h4: 'text-base font-semibold text-slate-800 mt-3 mb-1.5',
      }
      const cls = headingClasses[tag as keyof typeof headingClasses] || headingClasses.h3

      return React.createElement(
        tag,
        { key: index, className: cls },
        node.children?.map((child: any, cIdx: number) => renderNode(child, cIdx))
      )
    }

    // Lists
    if (node.type === 'list') {
      const listTag = node.listType === 'number' ? 'ol' : 'ul'
      const listCls =
        node.listType === 'number'
          ? 'list-decimal pl-5 mb-4 space-y-1.5 text-slate-700 text-sm sm:text-base'
          : 'list-disc pl-5 mb-4 space-y-1.5 text-slate-700 text-sm sm:text-base'

      return React.createElement(
        listTag,
        { key: index, className: listCls },
        node.children?.map((child: any, cIdx: number) => renderNode(child, cIdx))
      )
    }

    // List item
    if (node.type === 'listitem') {
      return (
        <li key={index}>
          {node.children?.map((child: any, cIdx: number) => renderNode(child, cIdx))}
        </li>
      )
    }

    // Quote
    if (node.type === 'quote') {
      return (
        <blockquote
          key={index}
          className="border-l-4 border-desa-gold-500 pl-4 py-1 my-4 italic text-slate-700 bg-slate-50/80 rounded-r-lg"
        >
          {node.children?.map((child: any, cIdx: number) => renderNode(child, cIdx))}
        </blockquote>
      )
    }

    // Fallback: render children
    if (Array.isArray(node.children)) {
      return (
        <div key={index}>
          {node.children.map((child: any, cIdx: number) => renderNode(child, cIdx))}
        </div>
      )
    }

    return null
  }

  return (
    <div className={`rich-text text-slate-700 ${className}`}>
      {children.map((child: any, idx: number) => renderNode(child, idx))}
    </div>
  )
}
