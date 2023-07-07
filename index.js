document.querySelector('.icon').addEventListener('mouseenter', function () {
  document.querySelector('.modal').style.display = 'block';
});

document.querySelector('.icon').addEventListener('mouseleave', function () {
  document.querySelector('.modal').style.display = 'none';
});