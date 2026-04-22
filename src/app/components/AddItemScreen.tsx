import { useState } from 'react';
import { Link } from 'react-router';
import { 
  ArrowLeft, Sparkles, Apple, Carrot, Beef, Milk, Shell, Coffee, 
  Droplets, Sparkle, Thermometer, Pill, Lightbulb, Scissors, Wind, Container,
  Wine, Cookie, Fish, Croissant, Pizza, IceCreamCone, Cake, CupSoda,
  Citrus, Cherry, Grape, Banana, Package
} from 'lucide-react';
import { useInventory, InventoryItem } from '../context/InventoryContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { toast } from 'sonner';

const groceryIcons = [
  { name: 'Apple', icon: Apple },
  { name: 'Citrus', icon: Citrus },
  { name: 'Banana', icon: Banana },
  { name: 'Cherry', icon: Cherry },
  { name: 'Grape', icon: Grape },
  { name: 'Carrot', icon: Carrot },
  { name: 'Beef', icon: Beef },
  { name: 'Fish', icon: Fish },
  { name: 'Shell', icon: Shell },
  { name: 'Milk', icon: Milk },
  { name: 'Coffee', icon: Coffee },
  { name: 'Wine', icon: Wine },
  { name: 'CupSoda', icon: CupSoda },
  { name: 'Cookie', icon: Cookie },
  { name: 'Croissant', icon: Croissant },
  { name: 'Pizza', icon: Pizza },
  { name: 'IceCreamCone', icon: IceCreamCone },
  { name: 'Cake', icon: Cake },
  { name: 'Container', icon: Container },
  { name: 'Package', icon: Package },
];

const toiletriesIcons = [
  { name: 'Droplets', icon: Droplets },
  { name: 'Sparkle', icon: Sparkle },
  { name: 'Wind', icon: Wind },
  { name: 'Thermometer', icon: Thermometer },
  { name: 'Pill', icon: Pill },
  { name: 'Lightbulb', icon: Lightbulb },
  { name: 'Scissors', icon: Scissors },
];

const categoryOptions = [
  'Fruits & Vegetables',
  'Meat & Dairy',
  'Bread & Bakery',
  'Pantry Staples',
  'Beverages',
  'Personal Care',
  'Bath Products',
  'Cleaning Supplies',
  'Paper Products',
  'First Aid',
];

// Helper to get icon component by name
const getIconComponent = (iconName: string) => {
  const allIcons = [...groceryIcons, ...toiletriesIcons];
  const found = allIcons.find(item => item.name === iconName);
  return found ? found.icon : Apple;
};

const rarityColors = {
  common: 'bg-gray-500',
  uncommon: 'bg-green-600',
  rare: 'bg-blue-600',
  epic: 'bg-purple-600',
  legendary: 'bg-orange-600',
};

const rarityTextColors = {
  common: 'text-gray-400',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-orange-400',
};

export default function AddItemScreen() {
  const { addItem } = useInventory();
  const [formData, setFormData] = useState<Omit<InventoryItem, 'id'>>({
    name: '',
    category: 'Fruits & Vegetables',
    quantity: 1,
    rarity: 'common',
    icon: 'Apple',
    expiryDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      addItem(formData);
      // Show success toast
      toast.success('Item added successfully!');
      // Reset form to default values
      setFormData({
        name: '',
        category: 'Fruits & Vegetables',
        quantity: 1,
        rarity: 'common' as const,
        icon: 'Apple',
        expiryDate: '',
      });
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="size-4 mr-2" />
              Back to Main
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="size-6 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white">Add New Item</h1>
          </div>
          <Link to="/inventory">
            <Button className="bg-blue-600 hover:bg-blue-700">
              To Inventory
              <Package className="size-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Form Card */}
        <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Main Form Fields */}
              <div className="space-y-6">
                {/* Item Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Item Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter item name..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-white">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* Expiry Date */}
                <div className="space-y-2">
                  <Label htmlFor="expiryDate" className="text-white">
                    Expiry Date (Optional)
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>

              {/* Right Column - Rarity, Icon, Preview */}
              <div className="space-y-6">
                {/* Rarity */}
                <div className="space-y-2">
                  <Label className="text-white">Rarity</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {(['common', 'uncommon', 'rare', 'epic', 'legendary'] as const).map((rarity) => (
                      <button
                        key={rarity}
                        type="button"
                        onClick={() => setFormData({ ...formData, rarity })}
                        className={`px-2 py-2 rounded-md capitalize font-medium transition-all text-xs ${
                          formData.rarity === rarity
                            ? `${rarityColors[rarity]} text-white scale-105`
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {rarity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon Selector */}
                <div className="space-y-2">
                  <Label className="text-white">Choose Icon</Label>
                  <div className="space-y-4 max-h-64 overflow-y-auto p-2 bg-black/20 rounded-lg">
                    {/* Groceries Section */}
                    <div>
                      <div className="text-sm text-white/70 font-medium mb-2">Groceries</div>
                      <div className="grid grid-cols-8 gap-2">
                        {groceryIcons.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => setFormData({ ...formData, icon: item.name })}
                              className={`p-2 rounded transition-all text-white flex items-center justify-center ${
                                formData.icon === item.name
                                  ? 'bg-white/30 scale-110'
                                  : 'bg-white/5 hover:bg-white/20'
                              }`}
                              style={{ imageRendering: 'pixelated' }}
                            >
                              <IconComponent className="size-6" strokeWidth={3} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Toiletries Section */}
                    <div>
                      <div className="text-sm text-white/70 font-medium mb-2">Toiletries & Household</div>
                      <div className="grid grid-cols-8 gap-2">
                        {toiletriesIcons.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => setFormData({ ...formData, icon: item.name })}
                              className={`p-2 rounded transition-all text-white flex items-center justify-center ${
                                formData.icon === item.name
                                  ? 'bg-white/30 scale-110'
                                  : 'bg-white/5 hover:bg-white/20'
                              }`}
                              style={{ imageRendering: 'pixelated' }}
                            >
                              <IconComponent className="size-6" strokeWidth={3} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 bg-black/30 rounded-lg border border-white/20">
                  <div className="text-sm text-white/70 mb-2">Preview:</div>
                  <div className="flex items-center gap-4">
                    <div className="text-white flex items-center justify-center">
                      {(() => {
                        const IconComponent = getIconComponent(formData.icon);
                        return <IconComponent className="size-12" strokeWidth={3} />;
                      })()}
                    </div>
                    <div>
                      <div className="font-bold text-white">{formData.name || 'Item Name'}</div>
                      <div className="text-sm text-white/70">{formData.category}</div>
                      <div className={`text-sm capitalize font-medium ${rarityTextColors[formData.rarity]}`}>{formData.rarity}</div>
                      {formData.expiryDate && (
                        <div className="text-sm text-white/70 mt-1">
                          Expires: {new Date(formData.expiryDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 text-lg"
            >
              Add to Inventory
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}