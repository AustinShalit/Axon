import React, { ReactElement } from "react";
import gql from "graphql-tag";
import { Container, GridList, GridListTile, IconButton, Toolbar, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { LazyLoadImage, ScrollPosition, trackWindowScroll } from "react-lazy-load-image-component";
import { GetDataset, GetDataset_dataset_images, GetDatasetVariables } from "./__generated__/GetDataset";
import { useQuery } from "@apollo/client";

const GET_DATASET = gql`
  query GetDataset($id: ID!) {
    dataset(id: $id) {
      id
      name
      images {
        path
        size {
          width
          height
        }
      }
    }
  }
`;

function DataGalleryBase(props: { images: GetDataset_dataset_images[]; scrollPosition: ScrollPosition }) {
  return (
    <GridList cellHeight={160} cols={3}>
      {props.images.map((image, index) => (
        <GridListTile key={index}>
          <LazyLoadImage
            alt={image.path}
            height={image.size.height}
            width={image.size.width}
            src={encodeURI(`http://localhost:4000/${image.path.replace("data/datasets", "dataset")}`)}
            scrollPosition={props.scrollPosition}
          />
        </GridListTile>
      ))}
    </GridList>
  );
}

const DataGallery = trackWindowScroll(DataGalleryBase);

export default function Dataset(props: { id: string }): ReactElement {
  const { data, loading, error } = useQuery<GetDataset, GetDatasetVariables>(GET_DATASET, {
    variables: {
      id: props.id
    }
  });

  if (loading) return <p>LOADING</p>;
  if (error || !data) return <p>ERROR</p>;

  return (
    <Container>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {data.dataset?.name}
        </Typography>
        <IconButton color="inherit">
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
      <Container>
        <Typography variant="h6">{data.dataset?.images.length} Image Samples</Typography>
        <DataGallery images={data.dataset?.images || []} />
      </Container>
    </Container>
  );
}