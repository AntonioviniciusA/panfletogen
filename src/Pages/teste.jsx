{
  footerData.logo && (
    <Rnd
      position={{
        x: footerData.positionlogofH,
        y: footerData.positionlogofV,
      }}
      size={{
        width: footerData.logo.width || 100,

        height: footerData.logo.height || "auto",
      }}
      minWidth={50}
      minHeight={50}
      bounds="parent"
      onDragStop={(e, d) => {
        setFooterData((prevData) => ({
          ...prevData,
          positionlogofH: d.x, // Atualiza a posição X no estado
          positionlogofV: d.y, // Atualiza a posição Y no estado
        }));
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setFooterData((prevData) => ({
          ...prevData,
          logoWidth: ref.style.width, // Atualiza a largura no estado
          logoHeight: ref.style.height, // Atualiza a altura no estado
          positionlogofH: position.x, // Atualiza a posição X no estado
          positionlogofV: position.y, // Atualiza a posição Y no estado
        }));
      }}
    >
      <img src={footerData.logo} alt="logo-footer" />
    </Rnd>
  );
}
{
  footerData.image1f && (
    <Rnd
      position={{
        x: footerData.positionimg1fH,
        y: footerData.positionimg1fV,
      }}
      size={{
        width: footerData.image1f.width || 100,

        height: footerData.image1f.height || "auto",
      }}
      minWidth={50}
      minHeight={50}
      bounds="parent"
      onDragStop={(e, d) => {
        setFooterData((prevData) => ({
          ...prevData,
          positionimg1fH: d.x, // Atualiza a posição X no estado
          positionimg1fV: d.y, // Atualiza a posição Y no estado
        }));
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setFooterData((prevData) => ({
          ...prevData,
          image1fWidth: ref.style.width, // Atualiza a largura no estado
          image1fHeight: ref.style.height, // Atualiza a altura no estado
          positionimg1fH: position.x, // Atualiza a posição X no estado
          positionimg1fV: position.y, // Atualiza a posição Y no estado
        }));
      }}
    >
      <img src={footerData.image1f} alt="image-footer-1" />
    </Rnd>
  );
}
{
  footerData.image2f && (
    <Rnd
      position={{
        x: footerData.positionimg2fH,
        y: footerData.positionimg2fV,
      }}
      size={{
        width: footerData.image2f.width || 100,

        height: footerData.image2f.height || "auto",
      }}
      minWidth={50}
      minHeight={50}
      bounds="parent"
      onDragStop={(e, d) => {
        setFooterData((prevData) => ({
          ...prevData,
          positionimg2fH: d.x, // Atualiza a posição X no estado
          positionimg2fV: d.y, // Atualiza a posição Y no estado
        }));
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setFooterData((prevData) => ({
          ...prevData,
          image2ffWidth: ref.style.width, // Atualiza a largura no estado
          image2ffHeight: ref.style.height, // Atualiza a altura no estado
          positionimg2fH: position.x, // Atualiza a posição X no estado
          positionimg2fV: position.y, // Atualiza a posição Y no estado
        }));
      }}
    >
      <img src={footerData.image2f} alt="image-footer-2" />
    </Rnd>
  );
}
{
  footerData.image3f && (
    <Rnd
      position={{
        x: footerData.positionimg3fH,
        y: footerData.positionimg3fV,
      }}
      size={{
        width: footerData.image3f.width || 100,

        height: footerData.image3f.height || "auto",
      }}
      minWidth={50}
      minHeight={50}
      bounds="parent"
      onDragStop={(e, d) => {
        setFooterData((prevData) => ({
          ...prevData,
          positionimg3fH: d.x, // Atualiza a posição X no estado
          positionimg3fV: d.y, // Atualiza a posição Y no estado
        }));
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setFooterData((prevData) => ({
          ...prevData,
          image2ffWidth: ref.style.width, // Atualiza a largura no estado
          image2ffHeight: ref.style.height, // Atualiza a altura no estado
          positionimg3fH: position.x, // Atualiza a posição X no estado
          positionimg3fV: position.y, // Atualiza a posição Y no estado
        }));
      }}
    >
      <img src={footerData.image3f} alt="image-footer-3" />
    </Rnd>
  );
}
{
  footerData.image4f && (
    <Rnd
      position={{
        x: footerData.positionimg4fH,
        y: footerData.positionimg4fV,
      }}
      size={{
        width: footerData.image4f.width || 100,

        height: footerData.image4f.height || "auto",
      }}
      minWidth={50}
      minHeight={50}
      bounds="parent"
      onDragStop={(e, d) => {
        setFooterData((prevData) => ({
          ...prevData,
          positionimg4fH: d.x, // Atualiza a posição X no estado
          positionimg4fV: d.y, // Atualiza a posição Y no estado
        }));
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setFooterData((prevData) => ({
          ...prevData,
          image2ffWidth: ref.style.width, // Atualiza a largura no estado
          image2ffHeight: ref.style.height, // Atualiza a altura no estado
          positionimg4fH: position.x, // Atualiza a posição X no estado
          positionimg4fV: position.y, // Atualiza a posição Y no estado
        }));
      }}
    >
      <img src={footerData.image4f} alt="image-footer-4" />
    </Rnd>
  );
}