import { Link } from "react-router";
import { Package, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function MainScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Inventorim
          </h1>
          <p className="text-xl text-purple-200">
            Manage your home inventory like playing a video
            game
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-12">
          <Link to="/inventory" className="w-full">
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer group h-full">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-purple-500/30 rounded-full group-hover:scale-110 transition-transform">
                  <Package className="size-12 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    View Inventory
                  </h2>
                  <p className="text-purple-200 mt-2 text-sm">
                    Browse your collected items
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/add-item" className="w-full">
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer group h-full">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-blue-500/30 rounded-full group-hover:scale-110 transition-transform">
                  <PlusCircle className="size-12 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Add Item
                  </h2>
                  <p className="text-purple-200 mt-2 text-sm">
                    Register a new item
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        <div className="pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-sm text-purple-200">
              <p>
                This is a gamified inventory manager app. 
              </p>
              <p>
                Press the 'View Inventory' button to check your current inventory.
              </p>
              <p>
                Press the 'Add Item' button to add new items to your inventory.
              </p> 
            </span>
          </div>
        </div>
        <div className="pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <div className="size-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-purple-200">
              System Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}