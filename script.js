// ==========================================
// LOGIKA SIDEBAR MENU (HAMBURGER)
// ==========================================

function bukaMenu() {
  const sidebar = document.getElementById("sidebar-menu");
  const overlay = document.getElementById("overlay-menu");
  
  sidebar.classList.add("open");
  overlay.classList.add("open");
}

function tutupMenu() {
  const sidebar = document.getElementById("sidebar-menu");
  const overlay = document.getElementById("overlay-menu");
  
  sidebar.classList.remove("open");
  overlay.classList.remove("open");
}
