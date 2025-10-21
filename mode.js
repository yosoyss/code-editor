// Check localStorage for saved mode
if (localStorage.getItem('mode') === 'light') {
  document.body.classList.add('light-mode');
  document.querySelector('#modeToggle i').classList.replace('fa-moon', 'fa-star');
}

const btn = document.getElementById('modeToggle');
btn.addEventListener('click', () => {
  const icon = btn.querySelector('i');
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {
    localStorage.setItem('mode', 'light');
    icon.classList.replace('fa-moon', 'fa-star'); // Sun icon for light mode
  } else {
    localStorage.setItem('mode', 'dark');
    icon.classList.replace('fa-star', 'fa-moon'); // Moon icon for dark mode
  }
});
