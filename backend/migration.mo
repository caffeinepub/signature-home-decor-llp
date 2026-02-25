import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    category : Text;
    price : Float;
    imageUrl : Text;
  };

  type OldActor = {
    products : [Product];
  };

  type NewActor = {
    products : Map.Map<Nat, Product>;
  };

  public func run(old : OldActor) : NewActor {
    let productsMap = Map.empty<Nat, Product>();
    for (product in old.products.values()) {
      productsMap.add(product.id, product);
    };
    { products = productsMap };
  };
};
