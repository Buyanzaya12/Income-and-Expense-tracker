"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import {
  House, AlarmClock, Activity, Anchor, Apple, Gem, HeartPulse, Leaf, Paperclip,
  Plane, Coffee, Dessert, CakeSlice, BusFront, Handshake, BriefcaseBusiness, LibraryBig,
  Notebook, Trees, Drama, GraduationCap, PiggyBank, CandyCane, PawPrint, Fuel, Cigarette,
  PartyPopper, Gamepad2, Flower2, Baby, Check
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const categoryIcons = [
  {
    name: "home",
    Icon: House
  },
  {
    name: "alarm-clock",
    Icon: AlarmClock,
  },
  {
    name: "activity",
    Icon: Activity
  },
  {
    name: "anchor",
    Icon: Anchor
  },
  {
    name: "apple",
    Icon: Apple,
  },
  {
    name: "gem",
    Icon: Gem,
  },
  {
    name: "heart-pulse",
    Icon: HeartPulse,
  },
  {
    name: "leaf",
    Icon: Leaf,
  },
  {
    name: "paperclip",
    Icon: Paperclip,
  },
  {
    name: "plane",
    Icon: Plane
  },
  {
    name: "coffee",
    Icon: Coffee,
  },
  {
    name: "dessert",
    Icon: Dessert,
  },
  {
    name: "cake-slice",
    Icon: CakeSlice
  },
  {
    name: "bus-front",
    Icon: BusFront
  },
  {
    name: "handshake",
    Icon: Handshake
  },
  {
    name: "briefcase-business",
    Icon: BriefcaseBusiness,
  },
  {
    name: "library-big",
    Icon: LibraryBig,
  },
  {
    name: "notebook",
    Icon: Notebook
  },
  {
    name: "trees",
    Icon: Trees
  },
  {
    name: "drama",
    Icon: Drama,
  },
  {
    name: "graduation-cap",
    Icon: GraduationCap,
  },
  {
    name: "piggy-bank",
    Icon: PiggyBank,
  },
  {
    name: "candy-cane",
    Icon: CandyCane,
  },
  {
    name: "paw-print",
    Icon: PawPrint,
  },
  {
    name: "fuel",
    Icon: Fuel,
  },
  {
    name: "cigarette",
    Icon: Cigarette,
  },
  {
    name: "party-popper",
    Icon: PartyPopper,
  },
  {
    name: "gamepad-2",
    Icon: Gamepad2,
  },
  {
    name: "flower-2",
    Icon: Flower2,
  },
  {
    name: "baby",
    Icon: Baby,
  }
]
const categoryColors = [
  {
    name: "blue",
    value: "#0166FF"
  },
  {
    name: "light-blue",
    value: "#01B3FF"
  },
  {
    name: "green",
    value: "#41CC00"
  },
  {
    name: "yellow",
    value: "#F9D100"
  },
  {
    name: "orange",
    value: "#FF7B01"
  },
  {
    name: "purple",
    value: "#AE01FF"
  },
  {
    name: "red",
    value: "#FF0101"
  },
]
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("home");
  const [color, setColor] = useState("blue");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState();
  function loadList() {
    fetch("http://localhost:4000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }
  useEffect(() => {
    loadList();
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/categories/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 404) {
          alert("Category not found")
        }
        loadList();
      });
  }

  function createNew() {
    setLoading(true);

    fetch(`http://localhost:4000/categories`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        color: color,
        icon: icon,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        loadList();
        setLoading(false);
        setOpen(false);
        toast("Successfully created.")
      });
  }

  useEffect(() => {
    if (editingCategory) {
      setOpen(true);
      setName(editingCategory.name);
      setIcon(editingCategory.icon);
      setColor(editingCategory.color);
    }
  }, [editingCategory]);

  return (
    <main>
      <Toaster />
      <Button className="bg-blue-400" onClick={() => setOpen(true)}>Add new category</Button>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <div className="flex">
            <Popover>
              <PopoverTrigger asChild>
                <Button className=""><House /></Button>
              </PopoverTrigger>
              <PopoverContent className="p-6">
                <div className="grid grid-cols-6 justify-items-center gap-6">
                  {categoryIcons.map(({ name, Icon }) => (
                    <div key={name} onClick={() => setIcon(name)} className={`${icon === name ? "bg-gray-300 rounded-md" : ""}`}>
                      <Icon />
                    </div>
                  ))}
                </div>
                <div className="h-[1px] my-6 bg-gray-300"></div>
                <div className="grid grid-cols-7 gap-[16px]">
                  {categoryColors.map(({ name, value }) => (
                    <div key={name} onClick={() => setColor(name)} className="w-6 h-6 rounded-full" style={{ backgroundColor: value }}>
                      {
                        color === name && <Check />
                      }
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Input disabled={loading} id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <DialogFooter>
            {
              editingCategory ? (
                <Button disabled={loading} className="w-full !rounded-full" onClick={createNew}>Update</Button>) :
                (<Button disabled={loading} className="w-full !rounded-full" onClick={createNew}>Add</Button>
                )
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {categories.map((category) => (
        <div key={category.id}>
          <CategoryIcon iconName={category.icon} color={category.color} />
          {category.name}
          <Button onClick={() => setEditingCategory(category)}>Edit</Button>
          <Button onClick={() => handleDelete(category.id)}>Delete</Button>
        </div>
      ))}
      <div>
        Wrong data
        <button onClick={() => handleDelete("wrongID")}>Delete</button>
      </div>
    </main>
  );
}

function CategoryIcon({ iconName, color }) {
  const iconObject = categoryIcons.find((item) => item.name === name);
  const colorObject = categoryColors.find((item) => item.name === color);
  if (!iconObject) {
    return <House />;
  }
  let hexColor;
  if (!colorObject) {
    hexColor = "#000";
  }
  else {
    hexColor = colorObject.value;
  }
  const { Icon } = iconObject;
  return <Icon style={{ color: hexColor }} />;
}