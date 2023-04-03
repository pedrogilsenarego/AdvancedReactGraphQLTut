import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: flex;
  flex-direction: row;
  max-width: var(--maxWidth);
  align-items: top;
  justify-content: center;
  gap: 2rem;
  img {
    width: 50%;

    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
// eslint-disable-next-line react/prop-types
const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  return (
    <ProductStyles>
      <div className="details">
        <Head>
          <title>Sick Fits | {Product.name}</title>
        </Head>
        <img
          src={Product.photo.image.publicUrlTransformed}
          alt={Product.photo.altText}
        />
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
};

export default SingleProduct;
