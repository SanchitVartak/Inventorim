import { Link } from 'react-router';
import { 
  ArrowLeft, Trash2, Minus, Apple, Carrot, Beef, Milk, Shell, Coffee, 
  Droplets, Sparkle, Thermometer, Pill, Lightbulb, Scissors, Wind, Container,
  Wine, Cookie, Fish, Croissant, Pizza, IceCreamCone, Cake, CupSoda,
  Citrus, Cherry, Grape, Banana, ArrowDownAZ, Package, Grid3x3
} from 'lucide-react';
import { useInventory, InventoryItem } from '../context/InventoryContext';
import { Button } from './ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';

const iconMap: Record<string, any> = {
  Apple, Citrus, Banana, Cherry, Grape, Carrot, Beef, Fish, Shell, Milk, 
  Coffee, Wine, CupSoda, Cookie, Croissant, Pizza, IceCreamCone, Cake, Container,
  Droplets, Sparkle, Wind, Thermometer, Pill, Lightbulb, Scissors
};

const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || Apple;
};

const rarityColors = {
  common: 'bg-gray-500 border-gray-400',
  uncommon: 'bg-green-600 border-green-400',
  rare: 'bg-blue-600 border-blue-400',
  epic: 'bg-purple-600 border-purple-400',
  legendary: 'bg-orange-600 border-orange-400',
};

const rarityTextColors = {
  common: 'text-gray-400',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-orange-400',
};

const categories = [
  { name: 'All Items', icon: Grid3x3 },
  { name: 'Fruits & Vegetables', icon: Apple },
  { name: 'Meat & Dairy', icon: Beef },
  { name: 'Bread & Bakery', icon: Croissant },
  { name: 'Pantry Staples', icon: Container },
  { name: 'Beverages', icon: Coffee },
  { name: 'Personal Care', icon: Sparkle },
  { name: 'Bath Products', icon: Droplets },
  { name: 'Cleaning Supplies', icon: Wind },
];

function getExpiryStatus(expiryDate?: string) {
  if (!expiryDate) return { color: 'bg-gray-500', percentage: 100, status: 'none' };
  
  const now = new Date();
  const expiry = new Date(expiryDate);
  const totalDays = 30; // Assume 30 days is "fresh"
  const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) {
    return { color: 'bg-red-600', percentage: 0, status: 'expired' };
  } else if (daysUntilExpiry < 7) {
    return { color: 'bg-red-500', percentage: (daysUntilExpiry / totalDays) * 100, status: 'urgent' };
  } else if (daysUntilExpiry < 14) {
    return { color: 'bg-yellow-500', percentage: (daysUntilExpiry / totalDays) * 100, status: 'soon' };
  } else {
    return { color: 'bg-green-500', percentage: Math.min((daysUntilExpiry / totalDays) * 100, 100), status: 'fresh' };
  }
}

export default function InventoryScreen() {
  const { items, removeItem, consumeItem, clearInventory } = useInventory();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [consumeQuantity, setConsumeQuantity] = useState(1);
  const [sortBy, setSortBy] = useState<'default' | 'expiry'>('default');
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [password, setPassword] = useState('');

  // Filter items by category and rarity
  const filteredItems = items.filter(item => 
    (selectedCategory === 'All Items' || item.category === selectedCategory) &&
    (selectedRarity === 'all' || item.rarity === selectedRarity)
  );

  // Sort items based on selection
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'expiry') {
      // Items without expiry date go to the end
      if (!a.expiryDate && !b.expiryDate) return 0;
      if (!a.expiryDate) return 1;
      if (!b.expiryDate) return -1;
      
      // Sort by expiry date (earliest first)
      return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
    }
    return 0; // default order
  });

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="size-4 mr-2" />
              Back to Main
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Your Inventory</h1>
          <Link to="/add-item">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Item
            </Button>
          </Link>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="bg-black/50 border border-white/10 rounded-lg p-3 flex flex-col gap-3">
            {categories.map(category => {
              const Icon = category.icon;
              const itemCount = category.name === 'All Items' 
                ? items.length 
                : items.filter(item => item.category === category.name).length;
              
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`relative p-4 rounded-lg transition-all group ${
                    selectedCategory === category.name
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Icon className="size-8" strokeWidth={3} />
                  
                  {/* Item count badge */}
                  {itemCount > 0 && (
                    <div className={`absolute -top-1 -right-1 ${
                      selectedCategory === category.name ? 'bg-blue-600' : 'bg-white/30'
                    } text-white text-xs font-bold rounded-full size-6 flex items-center justify-center`}>
                      {itemCount}
                    </div>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-black/90 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {category.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Stats Bar */}
            <div className="bg-black/50 border border-white/10 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{filteredItems.length}</div>
                  <div className="text-sm text-gray-400">Filtered Items</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {filteredItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                  <div className="text-sm text-gray-400">Total Quantity</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {filteredItems.filter(item => item.rarity === 'rare' || item.rarity === 'epic' || item.rarity === 'legendary').length}
                  </div>
                  <div className="text-sm text-gray-400">Rare Items</div>
                </div>
              </div>
            </div>

            {/* Sort and Filter Controls */}
            {items.length > 0 && (
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Filter by Rarity:</span>
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="bg-white/10 text-white border border-white/20 rounded px-3 py-2 text-sm hover:bg-white/20 transition-all"
                  >
                    <option value="all">All</option>
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Sort by:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortBy('default')}
                      className={`px-3 py-2 rounded text-sm transition-all ${
                        sortBy === 'default'
                          ? 'bg-white text-black font-bold'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      Default
                    </button>
                    <button
                      onClick={() => setSortBy('expiry')}
                      className={`px-3 py-2 rounded text-sm transition-all flex items-center gap-1 ${
                        sortBy === 'expiry'
                          ? 'bg-red-500 text-white font-bold'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <ArrowDownAZ className="size-4" strokeWidth={3} />
                      Expiry
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Inventory Grid */}
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4 flex justify-center">
                  <Package className="size-24 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Empty Inventory</h2>
                <p className="text-gray-400 mb-6">Start adding items to build your collection!</p>
                <Link to="/add-item">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Add Your First Item
                  </Button>
                </Link>
              </div>
            ) : sortedItems.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-white mb-2">No items of selected types</h2>
                <p className="text-gray-400">Try adjusting your filters to see more items.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {sortedItems.map((item) => {
                  const quantityPercentage = Math.min((item.quantity / 10) * 100, 100);
                  const expiryStatus = getExpiryStatus(item.expiryDate);
                  
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item);
                        setConsumeQuantity(1);
                      }}
                      className={`relative aspect-square ${rarityColors[item.rarity]} border-4 rounded-lg p-2 hover:scale-105 transition-transform cursor-pointer group flex flex-col`}
                    >
                      {/* Left Bar - Quantity */}
                      <div className="absolute left-1 top-1 bottom-1 w-2 bg-black/50 rounded-full overflow-hidden border border-white/30">
                        <div 
                          className="absolute bottom-0 w-full bg-blue-400 transition-all"
                          style={{ height: `${quantityPercentage}%` }}
                        ></div>
                      </div>

                      {/* Right Bar - Expiry */}
                      <div className="absolute right-1 top-1 bottom-1 w-2 bg-black/50 rounded-full overflow-hidden border border-white/30">
                        <div 
                          className={`absolute bottom-0 w-full ${expiryStatus.color} transition-all`}
                          style={{ height: `${expiryStatus.percentage}%` }}
                        ></div>
                      </div>

                      {/* Item Icon */}
                      <div className="flex items-center justify-center flex-1">
                        {(() => {
                          const IconComponent = getIconComponent(item.icon);
                          return <IconComponent className="size-16 text-white" strokeWidth={3} />;
                        })()}
                      </div>

                      {/* Item Name */}
                      <div className="text-center text-white text-xs px-1 pb-1 truncate">
                        {item.name}
                      </div>

                      {/* Quantity Badge */}
                      {item.quantity > 1 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                          x{item.quantity}
                        </div>
                      )}

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]">
                        <div className="font-bold">{item.name}</div>
                        <div className="text-xs text-gray-300">{item.category}</div>
                        <div className={`text-xs capitalize font-medium ${rarityTextColors[item.rarity]}`}>{item.rarity}</div>
                        {item.expiryDate && (
                          <div className="text-xs text-gray-300 mt-1">
                            Expires: {new Date(item.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Clear Inventory Button */}
            {items.length > 0 && (
              <div className="absolute bottom-12 right-4 z-[1000]">
                <Button variant="destructive" onClick={() => setShowClearDialog(true)}>
                  Clear Inventory
                </Button>
              </div>
            )}

            {/* Item Action Dialog */}
            <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
              <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-white/20 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-3">
                    {selectedItem && (() => {
                      const IconComponent = getIconComponent(selectedItem.icon);
                      return <IconComponent className="size-12 text-white" strokeWidth={3} />;
                    })()}
                    <span>{selectedItem?.name}</span>
                  </DialogTitle>
                  <DialogDescription className="text-white/70 space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Category:</span>
                      <span className="font-medium">{selectedItem?.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Quantity:</span>
                      <span className="font-medium">{selectedItem?.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Rarity:</span>
                      <span className={`font-medium capitalize ${rarityTextColors[selectedItem?.rarity || 'common']}`}>{selectedItem?.rarity}</span>
                    </div>
                    {selectedItem?.expiryDate && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Expires:</span>
                        <span className="font-medium">{new Date(selectedItem.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    {/* Quantity Selector */}
                    <div className="pt-4 border-t border-white/10">
                      <label className="text-sm block mb-2">Consume Quantity:</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setConsumeQuantity(Math.max(1, consumeQuantity - 1))}
                          className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={selectedItem?.quantity || 1}
                          value={consumeQuantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            setConsumeQuantity(Math.min(Math.max(1, val), selectedItem?.quantity || 1));
                          }}
                          className="w-20 bg-white/10 text-white text-center px-2 py-1 rounded border border-white/20 focus:outline-none focus:border-blue-400"
                        />
                        <button
                          onClick={() => setConsumeQuantity(Math.min(selectedItem?.quantity || 1, consumeQuantity + 1))}
                          className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                  <Button
                    onClick={() => {
                      if (selectedItem) {
                        consumeItem(selectedItem.id, consumeQuantity);
                        setSelectedItem(null);
                      }
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Minus className="size-4 mr-2" />
                    Use ({consumeQuantity})
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedItem) {
                        removeItem(selectedItem.id);
                        setSelectedItem(null);
                      }
                    }}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="size-4 mr-2" />
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Clear Inventory Dialog */}
            <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
              <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-white/20 text-white">
                <DialogHeader>
                  <DialogTitle>Clear Inventory</DialogTitle>
                  <DialogDescription>
                    This will permanently delete all items. Enter password to confirm.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400"
                    placeholder="Enter password"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => { setShowClearDialog(false); setPassword(''); }}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (password === 'foobar') {
                        clearInventory();
                        setShowClearDialog(false);
                        setPassword('');
                      } else {
                        alert('Incorrect password');
                      }
                    }}
                  >
                    Clear
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}