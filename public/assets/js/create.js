// why does travis not like this? I use loadFile on my html
const loadFile = (event) => {
  const image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
};
