const Img = (props: {
  src: string,
  srcFallback: string,
}) => {
  const {src, srcFallback} = props;
  return (
    <img src={src ?? srcFallback} alt="" onError={(e) => {
      e.currentTarget.src = srcFallback;
    }} />
  )
}

export default Img;