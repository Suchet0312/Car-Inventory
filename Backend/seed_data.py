"""
Seed the database with sample data for testing.
Run this script to populate the database with:
- An admin user (admin@example.com / admin123)
- A regular user (user@example.com / user123)
- Sample vehicles
"""

from pwdlib import PasswordHash
from app.database import SessionLocal
from app.models import User, Vehicle

password_hash = PasswordHash.recommended()


def seed_database():
    db = SessionLocal()
    
    try:
        # Check if users already exist
        existing_admin = db.query(User).filter(User.email == "admin@example.com").first()
        if existing_admin:
            print("Database already seeded. Skipping...")
            return
        
        # Create admin user
        admin = User(
            email="admin@example.com",
            hashed_password=password_hash.hash("admin123"),
            role="admin"
        )
        db.add(admin)
        
        # Create regular user
        user = User(
            email="user@example.com",
            hashed_password=password_hash.hash("user123"),
            role="user"
        )
        db.add(user)
        
        # Create sample vehicles
        vehicles = [
            Vehicle(
                make="Toyota",
                model="Camry",
                category="Sedan",
                price=25000.00,
                quantity=5
            ),
            Vehicle(
                make="Honda",
                model="Civic",
                category="Sedan",
                price=22000.00,
                quantity=3
            ),
            Vehicle(
                make="Ford",
                model="F-150",
                category="Truck",
                price=35000.00,
                quantity=7
            ),
            Vehicle(
                make="Tesla",
                model="Model 3",
                category="Electric",
                price=42000.00,
                quantity=2
            ),
            Vehicle(
                make="Chevrolet",
                model="Tahoe",
                category="SUV",
                price=52000.00,
                quantity=4
            ),
            Vehicle(
                make="BMW",
                model="X5",
                category="SUV",
                price=65000.00,
                quantity=1
            ),
            Vehicle(
                make="Mercedes-Benz",
                model="C-Class",
                category="Luxury Sedan",
                price=55000.00,
                quantity=3
            ),
            Vehicle(
                make="Jeep",
                model="Wrangler",
                category="SUV",
                price=38000.00,
                quantity=6
            ),
            Vehicle(
                make="Mazda",
                model="CX-5",
                category="SUV",
                price=28000.00,
                quantity=0  # Out of stock for testing
            ),
        ]
        
        for vehicle in vehicles:
            db.add(vehicle)
        
        db.commit()
        
        print("✅ Database seeded successfully!")
        print("\n📊 Created:")
        print(f"   - Admin user:  admin@example.com / admin123")
        print(f"   - Regular user: user@example.com / user123")
        print(f"   - {len(vehicles)} sample vehicles")
        print("\n🚀 You can now start the application and login with either user.")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
