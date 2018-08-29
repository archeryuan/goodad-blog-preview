import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import noImage from "../assets/images/no-image-icon.png";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../assets/css/normalize.css'
import '../assets/css/webflow.css'
import '../assets/css/goodad.webflow.css'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 960,
    height: '100%',
  },
  subheader: {
    width: '100%',
  },
  card: {
    maxWidth: 480,
    height:428,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  media: {
    height: 280,
  },
};



const BlogPost = ({node}) => {
  return (
    <div>
      <img src={node.heroImage.responsiveResolution ? node.heroImage.responsiveResolution.src : noImage}/>
      <Link to={node.slug}><h3>{node.title}</h3></Link>
      <div>{node.body.childMarkdownRemark.excerpt}</div>
    </div>
  )
}
// const IndexPage = ({data}) => (
//   <ul className='blog-post'>
//     {data.allContentfulBlogPost.edges.map((edge) => <BlogPost node={edge.node} />)}
//   </ul>
// )

function IndexPage(props) {
  const { classes } = props;
  const { data } = props;
  let wWidth = 960;

  if(typeof window !== 'undefined' && window.innerWidth){
    wWidth = window.innerWidth;
  }
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={wWidth < 900 ? 1 : 2}>
        {data.allContentfulBlogPost.edges.map((edge) => {if(edge.node.heroImage){return (
          <GridListTile key={edge.node.id} cols={edge.node.cols || 1} rows={3} style={{
            paddingLeft: 20,
            paddingRight: 20
          }}>
            <Card className={classes.card}>
              <Link to={edge.node.slug}>
                <CardMedia
                  className={classes.media}
                  image={edge.node.heroImage.responsiveResolution ? edge.node.heroImage.responsiveResolution.src : noImage}
                  title={edge.node.title}
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2" style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#f44e7a',
                  textAlign: 'center',
                }}>
                  <Link to={edge.node.slug} style={{
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#f44e7a',
                    textAlign: 'center',
                    textDecoration: 'none'
                  }}>
                    {edge.node.title}
                  </Link>
                </Typography>
                <Typography component="p">
                  {edge.node.body.childMarkdownRemark.excerpt}
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>
          </GridListTile>)}} )}
      </GridList>
    </div>
  );
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndexPage);

// export default IndexPage

export const pageQuery = graphql`
   query pageQuery {
    allContentfulBlogPost (
    filter: {
      node_locale: {eq: "en-US"},
      title: {ne: null},
    },
    sort:{ fields: [publishDate], order: DESC }
    ) {
        edges {
          node{
            id
            title
            slug
            publishDate
            body{
              childMarkdownRemark {
                excerpt
              }
            }
            heroImage {
              responsiveResolution(width: 300, height: 300) {
                src
              }
            }
          }
        }
    }
   }
`
