export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  // map data to an array of path objects with params (id)
  const paths = data.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();

  return {
    props: { info: data },
  };
};

const Details = ({ info }) => {
  return (
    <div>
      <h1>{info.name}</h1>
      <p>{info.email}</p>
      <p>{info.website}</p>
      <p>{info.address.city}</p>
    </div>
  );
};

export default Details;
