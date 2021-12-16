import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Card, Avatar, ResourceList, ResourceItem, TextStyle, Thumbnail } from '@shopify/polaris';
import store from 'store-js';

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;
const PRODUCT_ID = gql`
query getProducts {
  products(first: 10) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id,
        title
        handle,
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
}`;

function ProductList() {
  const {loading,error,data} = useQuery(PRODUCT_ID);
  if(loading) return <div>loading</div>
  if(error) return <div>error</div>
  console.log(data.products.edges);
  return (
    <Card>
        <ResourceList
        showHeader
        resourceName={{ singular: 'Product', plural: 'Products' }}
        items={data.products.edges}
        renderItem={item => {
        const media = (
        <Thumbnail
        source={
        item.node.images.edges[0] ? item.node.images.edges[0].node.originalSrc : ''
        }
        alt={
        item.node.images.edges[0] ? item.node.images.edges[0].altText : ''
        }
        />
        );
        return (
            <ResourceList.Item
            id={item.id}
            media={media}
            accessibilityLabel={`View details for ${item.node.title}`}
            >
            </ResourceList.Item>
        )
        }}
        />
 </Card>
 
      
    
  )
}

export default ProductList;