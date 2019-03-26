import * as React from "react"
import Masonry from "react-masonry-component"
import cls from "../../pages/blog.module.scss"
import InternalLink from "../../helper/links/InternalLink"

const masonryOptions = {
  percentPosition: true,
  // columnWidth: cls.gridSizer,
  // itemSelector: cls.blogGrid,
  gutter: 22,
  horizontalOrder: true,
  transitionDuration: 0,
}

class BlogGrid extends React.Component {
  render() {
    const childElements = this.props.articles.map(function(article) {
      return (
        <InternalLink
          key={article.id}
          to={`/blog/${article.slug}`}
          // className="blog-card article-card">
          className={`${cls.blogCard} ${cls.articleCard}`}>
          <div className={cls.blogCard__category}>
            {article.category}
          </div>
          <h2 className={cls.articleCard__title}>
            {article.title}
          </h2>
          <div className={cls.articleCard__snippet}>
            {article.snippet}
          </div>
          <div className={cls.articleCard__author}>
            <div className={cls.articleCard__authorImg}
                 style={{ backgroundImage: `url('${article.authorImg}')` }}></div>
            <div className={cls.articleCard__authorDetails}>
              <div className={cls.articleCard__name}>{article.authorName}</div>
              <div className={cls.articleCard__date}>{article.date}</div>
            </div>
          </div>
        </InternalLink>
      )
    })

    return (
      <Masonry
        className={cls.blogGrid} // default ''
        options={masonryOptions} // default {}
      >
        <div className={cls.gridSizer}/>
        {childElements}
      </Masonry>
    )
  }
}

export default BlogGrid
