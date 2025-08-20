const Nav =() =>{
    return(
        <nav class="navbar">
			<div class="nav-container">
				<div class="nav-logo">
					<a href="/">Astro + SolidJS</a>
				</div>
				<ul class="nav-menu">
					<li><a href="/contact" class="nav-link">Contact</a></li>
					<li><a href="/" class="nav-link">Home</a></li>
					<li><a href="/login" class="nav-link">Login</a></li>
					<li><a href="/register" class="nav-link">Register</a></li>
					<li><a href="/manage" class="nav-link">Manage</a></li>
				</ul>
			</div>
		</nav>
    )
}
export default Nav;