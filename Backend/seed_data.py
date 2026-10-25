"""
Seed the database with sample data for testing.
Run this script to populate the database with:
- An admin user (admin@example.com / admin123)
- A regular user (user@example.com / user123)
- 20 curated premium vehicles
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
        
        # Create curated vehicle inventory - 20 vehicles (Prices in INR)
        # Conversion rate: 1 USD = ₹95
        vehicles = [
            # Luxury Sedans
            Vehicle(make="Mercedes-Benz", model="S-Class", category="Luxury Sedan", price=10450000, quantity=3),  # $110,000 * 95
            Vehicle(make="BMW", model="7 Series", category="Luxury Sedan", price=9025000, quantity=2),  # $95,000 * 95
            Vehicle(make="Audi", model="A8", category="Luxury Sedan", price=8360000, quantity=4),  # $88,000 * 95
            Vehicle(make="Mercedes-Benz", model="E-Class", category="Luxury Sedan", price=6175000, quantity=5),  # $65,000 * 95
            Vehicle(make="BMW", model="5 Series", category="Luxury Sedan", price=5510000, quantity=6),  # $58,000 * 95
            Vehicle(make="Lexus", model="LS 500", category="Luxury Sedan", price=7410000, quantity=3),  # $78,000 * 95
            Vehicle(make="Genesis", model="G90", category="Luxury Sedan", price=7125000, quantity=2),  # $75,000 * 95
            Vehicle(make="Cadillac", model="CT5", category="Luxury Sedan", price=4560000, quantity=4),  # $48,000 * 95
            
            # Regular Sedans
            Vehicle(make="Toyota", model="Camry", category="Sedan", price=2660000, quantity=12),  # $28,000 * 95
            Vehicle(make="Honda", model="Accord", category="Sedan", price=2755000, quantity=10),  # $29,000 * 95
            Vehicle(make="Honda", model="Civic", category="Sedan", price=2280000, quantity=15),  # $24,000 * 95
            Vehicle(make="Toyota", model="Corolla", category="Sedan", price=2090000, quantity=14),  # $22,000 * 95
            Vehicle(make="Mazda", model="Mazda3", category="Sedan", price=2375000, quantity=8),  # $25,000 * 95
            Vehicle(make="Nissan", model="Altima", category="Sedan", price=2470000, quantity=9),  # $26,000 * 95
            Vehicle(make="Hyundai", model="Sonata", category="Sedan", price=2565000, quantity=7),  # $27,000 * 95
            Vehicle(make="Kia", model="K5", category="Sedan", price=2518000, quantity=6),  # $26,500 * 95
            
            # Luxury SUVs
            Vehicle(make="BMW", model="X5", category="Luxury SUV", price=6460000, quantity=4),  # $68,000 * 95
            Vehicle(make="Mercedes-Benz", model="GLE", category="Luxury SUV", price=6840000, quantity=3),  # $72,000 * 95
            Vehicle(make="Audi", model="Q7", category="Luxury SUV", price=6175000, quantity=5),  # $65,000 * 95
            Vehicle(make="Lexus", model="RX 350", category="Luxury SUV", price=4940000, quantity=6),  # $52,000 * 95
        ]
        
        for vehicle in vehicles:
            db.add(vehicle)
        
        db.commit()
        
        print("✅ Database seeded successfully!")
        print("\n📊 Created:")
        print(f"   - Admin user:  admin@example.com / admin123")
        print(f"   - Regular user: user@example.com / user123")
        print(f"   - {len(vehicles)} curated premium vehicles")
        print("\n🚗 Inventory Summary:")
        print("   - Luxury Sedans: 8 models")
        print("   - Regular Sedans: 8 models")
        print("   - Luxury SUVs: 4 models")
        print("\n🚀 Total: 20 vehicles ready for display!")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
