import React, { Component} from 'react';
import PropTypes from 'prop-types';

class BlogPost extends Component {
  render() {
    if(!this.props.data.contentfulBlogPost){
      return (
        <div>
          "No content!"
        </div>
      )
    }else{
      const {
        title,
        body
      } = this.props.data.contentfulBlogPost
      if(body){
        return (
          <div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{__html: body.childMarkdownRemark.html}} />
          </div>
        )
      }else{
        return (
          <div>
            <h1>{title}</h1>
          </div>
        )
      }

    }

  }
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired
}

export default BlogPost

export const pageQuery = graphql`
  query blogPostQuery($slug: String!){
    contentfulBlogPost(
      slug: {eq: $slug},
      title: {ne: null}
    ) {
      title
      slug
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
