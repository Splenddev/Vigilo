const Info = ({
  infos = [
    {
      title: 'Page title',
      description: 'This tells the function of a page',
    },
  ],
}) => {
  return (
    <div>
      <h1>Info Modal</h1>
      <div>
        {infos.map((info, index) => (
          <div key={index}>
            <h2>{info.title}</h2>
            <p>{info.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Info;
