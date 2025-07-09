const products = [
    // Egg Products
    {
      category: "egg",
      price: 100,
      rating: 4,
      image: "https://i.pinimg.com/474x/11/58/3f/11583ff12bd535c1e7ee3200a91bdc74.jpg",
      title: "Organic Egg",
      seller: "Farm Fresh"
    },
    {
      category: "egg",
      price: 100,
      rating: 4,
      image: "https://i.pinimg.com/474x/11/58/3f/11583ff12bd535c1e7ee3200a91bdc74.jpg",
      title: "Organic Egg",
      seller: "Farm Fresh"
    },
    {
      category: "egg",
      price: 100,
      rating: 4,
      image: "https://i.pinimg.com/474x/11/58/3f/11583ff12bd535c1e7ee3200a91bdc74.jpg",
      title: "Organic Egg",
      seller: "Farm Fresh"
    },
  
    // Vegetable Products
    {
      category: "vegetables",
      price: 80,
      rating: 5,
      image: "https://i.pinimg.com/474x/20/b0/ea/20b0ea7444991e42c2d269a8a99f14f8.jpg",
      title: "Broccoli",
      seller: "Green Farm"
    },
    {
      category: "vegetables",
      price: 80,
      rating: 5,
      image: "https://i.pinimg.com/474x/20/b0/ea/20b0ea7444991e42c2d269a8a99f14f8.jpg",
      title: "Broccoli",
      seller: "Green Farm"
    },
    {
      category: "vegetables",
      price: 80,
      rating: 5,
      image: "https://i.pinimg.com/474x/20/b0/ea/20b0ea7444991e42c2d269a8a99f14f8.jpg",
      title: "Broccoli",
      seller: "Green Farm"
    },
  
    // Fruit Products
    {
      category: "fruits",
      price: 120,
      rating: 4,
      image: "https://i.pinimg.com/474x/49/24/20/4924205307c956be52bffa27ca5ffa08.jpg",
      title: "Raspberry",
      seller: "Fruit Garden"
    },
    {
      category: "fruits",
      price: 120,
      rating: 4,
      image: "https://i.pinimg.com/474x/49/24/20/4924205307c956be52bffa27ca5ffa08.jpg",
      title: "Raspberry",
      seller: "Fruit Garden"
    },
    {
      category: "fruits",
      price: 120,
      rating: 4,
      image: "https://i.pinimg.com/474x/49/24/20/4924205307c956be52bffa27ca5ffa08.jpg",
      title: "Raspberry",
      seller: "Fruit Garden"
    },
  
    // Meat Products
    {
      category: "meat",
      price: 200,
      rating: 3,
      image: "https://i.pinimg.com/474x/1e/8a/d8/1e8ad88636043849e150b22b0d75ee22.jpg",
      title: "Beef",
      seller: "Meat Masters"
    },
    {
      category: "meat",
      price: 200,
      rating: 3,
      image: "https://i.pinimg.com/474x/1e/8a/d8/1e8ad88636043849e150b22b0d75ee22.jpg",
      title: "Beef",
      seller: "Meat Masters"
    },
    {
      category: "meat",
      price: 200,
      rating: 3,
      image: "https://i.pinimg.com/474x/1e/8a/d8/1e8ad88636043849e150b22b0d75ee22.jpg",
      title: "Beef",
      seller: "Meat Masters"
    },
  
    // Oil Products
    {
      category: "oil",
      price: 150,
      rating: 5,
      image: "https://i.pinimg.com/474x/3d/7a/77/3d7a770c8a7c1592cec6e2e20995a6e6.jpg",
      title: "Olive Oil",
      seller: "Olive Press"
    },
    {
      category: "oil",
      price: 150,
      rating: 5,
      image: "https://i.pinimg.com/474x/3d/7a/77/3d7a770c8a7c1592cec6e2e20995a6e6.jpg",
      title: "Olive Oil",
      seller: "Olive Press"
    },
    {
      category: "oil",
      price: 150,
      rating: 5,
      image: "https://i.pinimg.com/474x/3d/7a/77/3d7a770c8a7c1592cec6e2e20995a6e6.jpg",
      title: "Olive Oil",
      seller: "Olive Press"
    }
  ];
  
  // Target container
  const galleryGrid = document.querySelector(".gallery-grid");
  
  // Function to generate stars
  function generateStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }
  
  // Loop through and render cards
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("gallery-card");
    card.setAttribute("data-category", product.category.toLowerCase());
    card.setAttribute("data-price", product.price);
    card.setAttribute("data-rating", product.rating);
  
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <div class="rating">${generateStars(product.rating)} (${product.rating})</div>
      <p class="seller">By ${product.seller}</p>
      <p class="price">$${product.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;
  
    galleryGrid.appendChild(card);
  });
  