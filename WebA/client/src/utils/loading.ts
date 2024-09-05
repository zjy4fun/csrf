export const showLoading = () => {
  const loading = document.createElement('div');
  loading.className = 'loading-spinner';
  loading.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loading);
};

export const hideLoading = () => {
  const loading = document.querySelector('.loading-spinner');
  if (loading) {
    document.body.removeChild(loading);
  }
};
