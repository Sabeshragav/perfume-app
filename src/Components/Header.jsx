const Header = () => (
    <header className="bg-purple-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="text-2xl font-bold text-white">Perfume Shop</div>
        <nav className="space-x-4">
          <a href="/" className="text-white hover:text-purple-200">Home</a>
          <a href="/collections" className="text-white hover:text-purple-200">Collections</a>
          <a href="/about" className="text-white hover:text-purple-200">About Us</a>
          <a href="/contact" className="text-white hover:text-purple-200">Contact</a>
        </nav>
      </div>
    </header>
  );
  
  export default Header;
  