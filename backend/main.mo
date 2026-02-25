import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    category : Text;
    price : Float;
    imageUrl : Text;
  };

  type Order = {
    id : Nat;
    guestName : Text;
    guestEmail : Text;
    shippingAddress : Text;
    productId : Nat;
    quantity : Nat;
    totalPrice : Float;
    status : Text;
    createdAt : Time.Time;
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    createdAt : Time.Time;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    excerpt : Text;
    body : Text;
    author : Text;
    date : Time.Time;
    category : Text;
  };

  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let blogPosts = Map.empty<Nat, BlogPost>();

  var nextProductId = 1;
  var nextOrderId = 1;
  var nextContactSubmissionId = 1;
  var nextBlogPostId = 1;

  public shared ({ caller }) func addProduct(name : Text, description : Text, category : Text, price : Float, imageUrl : Text) : async Nat {
    let id = nextProductId;
    let product : Product = {
      id;
      name;
      description;
      category;
      price;
      imageUrl;
    };
    products.add(id, product);
    nextProductId += 1;
    id;
  };

  public shared ({ caller }) func placeOrder(guestName : Text, guestEmail : Text, shippingAddress : Text, productId : Nat, quantity : Nat, totalPrice : Float) : async Nat {
    let id = nextOrderId;
    let order : Order = {
      id;
      guestName;
      guestEmail;
      shippingAddress;
      productId;
      quantity;
      totalPrice;
      status = "Pending";
      createdAt = Time.now();
    };
    orders.add(id, order);
    nextOrderId += 1;
    id;
  };

  public shared ({ caller }) func submitContact(name : Text, email : Text, subject : Text, message : Text) : async Nat {
    let id = nextContactSubmissionId;
    let submission : ContactSubmission = {
      id;
      name;
      email;
      subject;
      message;
      createdAt = Time.now();
    };
    contactSubmissions.add(id, submission);
    nextContactSubmissionId += 1;
    id;
  };

  public shared ({ caller }) func addBlogPost(title : Text, excerpt : Text, body : Text, author : Text, category : Text) : async Nat {
    let id = nextBlogPostId;
    let post : BlogPost = {
      id;
      title;
      excerpt;
      body;
      author;
      date = Time.now();
      category;
    };
    blogPosts.add(id, post);
    nextBlogPostId += 1;
    id;
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().filter(func(p) { p.category == category }).toArray();
  };

  public query ({ caller }) func getOrders() : async [Order] {
    orders.values().toArray();
  };

  public query ({ caller }) func getOrderById(id : Nat) : async ?Order {
    orders.get(id);
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  public query ({ caller }) func getBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  public query ({ caller }) func getBlogPostsByCategory(category : Text) : async [BlogPost] {
    blogPosts.values().filter(func(p) { p.category == category }).toArray();
  };

  public shared ({ caller }) func applyCouponCode(total : Float, couponCode : Text) : async Float {
    switch (couponCode) {
      case ("DISCOUNT10") { total * 0.9 };
      case ("SAVE20") { total * 0.8 };
      case (_) { total };
    };
  };

  public shared ({ caller }) func initializeSampleContent() : async () {
    if (products.isEmpty()) {
      let initialProducts : [Product] = [
        {
          id = 1;
          name = "Contemporary Sofa";
          description = "A stylish contemporary sofa in durable blue fabric.";
          category = "Living Room";
          price = 499.99;
          imageUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
        },
        {
          id = 2;
          name = "Queen Bed Frame";
          description = "Solid wood queen bed frame with headboard in walnut finish.";
          category = "Bedroom";
          price = 399.50;
          imageUrl = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04";
        },
        {
          id = 3;
          name = "Kitchen Bar Stools";
          description = "Set of 2 modern kitchen bar stools with metal legs.";
          category = "Kitchen";
          price = 149.99;
          imageUrl = "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1";
        },
        {
          id = 4;
          name = "Patio Umbrella";
          description = "Large outdoor patio umbrella with UV resistant fabric.";
          category = "Outdoor";
          price = 129.99;
          imageUrl = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca";
        },
        {
          id = 5;
          name = "Home Office Desk";
          description = "Spacious home office desk with built-in storage shelves.";
          category = "Office";
          price = 299.00;
          imageUrl = "https://images.unsplash.com/photo-1465101178521-1ea43ad3cb9a";
        },
        {
          id = 6;
          name = "Dining Table Set";
          description = "6-piece dining table set with upholstered chairs.";
          category = "Dining Room";
          price = 599.99;
          imageUrl = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca";
        },
        {
          id = 7;
          name = "Garden Bench";
          description = "Weather-resistant garden bench in classic design.";
          category = "Garden";
          price = 179.00;
          imageUrl = "https://images.unsplash.com/photo-1464983953574-0892a716854b";
        },
        {
          id = 8;
          name = "Accent Chair";
          description = "Mid-century style accent chair with yellow upholstery.";
          category = "Living Room";
          price = 249.99;
          imageUrl = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca";
        },
        {
          id = 9;
          name = "Nightstand Set";
          description = "Pair of modern nightstands with metal hardware.";
          category = "Bedroom";
          price = 89.99;
          imageUrl = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04";
        },
        {
          id = 10;
          name = "LED Desk Lamp";
          description = "Sleek LED desk lamp with adjustable brightness.";
          category = "Office";
          price = 89.99;
          imageUrl = "https://images.unsplash.com/photo-1465101178521-1ea43ad3cb9a";
        },
        {
          id = 11;
          name = "Wall Art Set";
          description = "3-piece nature-inspired wall art set for decor.";
          category = "Living Room";
          price = 99.00;
          imageUrl = "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1";
        },
        {
          id = 12;
          name = "Throw Pillow Set";
          description = "Set of 4 decorative throw pillows in assorted colors.";
          category = "Bedroom";
          price = 59.99;
          imageUrl = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04";
        },
        {
          id = 13;
          name = "Garden Illumination Lights";
          description = "Pack of 8 solar-powered garden illumination lights.";
          category = "Garden";
          price = 79.99;
          imageUrl = "https://images.unsplash.com/photo-1464983953574-0892a716854b";
        },
        {
          id = 14;
          name = "Outdoor Bistro Set";
          description = "Charming 3-piece outdoor bistro set for patios.";
          category = "Outdoor";
          price = 179.95;
          imageUrl = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca";
        },
        {
          id = 15;
          name = "Luxury Bed Linen Set";
          description = "Premium 6-piece cotton bed linen set for comfort.";
          category = "Bedroom";
          price = 129.98;
          imageUrl = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04";
        },
      ];

      let productList = List.fromArray<Product>(initialProducts);
      for (product in productList.values()) {
        products.add(product.id, product);
      };

      let initialBlogPosts : [BlogPost] = [
        {
          id = 1;
          title = "Creating Multi-Functional Living Spaces";
          excerpt = "Tips for optimizing your living space for both work and relaxation.";
          body = "# Creating Multi-Functional Living Spaces\n\nIn today's world, our living spaces serve multiple purposes...";
          author = "Janet Miller";
          date = Time.now();
          category = "Living Room";
        },
        {
          id = 2;
          title = "Eco-Friendly Bedroom Makeovers";
          excerpt = "Learn how to transform your bedroom with sustainable materials.";
          body = "# Eco-Friendly Bedroom Makeovers\n\nWhether you're looking to completely redo your bedroom or just add some sustainable touches...";
          author = "Michael Green";
          date = Time.now();
          category = "Bedroom";
        },
        {
          id = 3;
          title = "Outdoor Entertaining Essentials";
          excerpt = "Host the perfect gathering with these outdoor must-haves.";
          body = "# Outdoor Entertaining Essentials\n\nNothing says summer like a perfectly curated outdoor gathering. Whether it's a BBQ,...";
          author = "Allison Park";
          date = Time.now();
          category = "Outdoor";
        },
        {
          id = 4;
          title = "Transforming Garden Spaces";
          excerpt = "Ideas for turning gardens into tranquil oases.";
          body = "# Transforming Garden Spaces\n\nGet ready to be inspired by these ideas and take the first step towards a more peaceful garden.";
          author = "Janet Miller";
          date = Time.now();
          category = "Garden";
        },
      ];

      let blogPostList = List.fromArray<BlogPost>(initialBlogPosts);
      for (post in blogPostList.values()) {
        blogPosts.add(post.id, post);
      };
    };
  };

  public shared ({ caller }) func resetData() : async () {
    products.clear();
    orders.clear();
    contactSubmissions.clear();
    blogPosts.clear();
    nextProductId := 1;
    nextOrderId := 1;
    nextContactSubmissionId := 1;
    nextBlogPostId := 1;
    await initializeSampleContent();
  };
};
