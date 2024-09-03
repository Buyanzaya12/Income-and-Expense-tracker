"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
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
    Icon: AlarmClock
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
    name: "",
    Icon: ,
  },
  {
    name: "",
    Icon: ,
  },
  {
    name: "",
    Icon: ,
  },
  {
    name: "",
    Icon: ,
  },
  {
    name: "",
    Icon: ,
  },
  {
    name: "",
    Icon: ,
  },
  {
    name: "",
    Icon: ,
  },
  {
    name: "",
    Icon: ,
  },
  {
    name: "",
    Icon: ,
  },
  {
    name: "",
    Icon: ,
  },
  {
    name: "",
    Icon: ,
  }
]

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
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
    const name = prompt("Name...");
    fetch(`http://localhost:4000/categories`, {
      method: "POST",
      body: JSON.stringify({ name: name }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        loadList();
      });
  }

  return (
    <main>
      <Button className="bg-blue-400" onClick={() => setOpen(true)}>Add new category</Button>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <Popover>
              <PopoverTrigger asChild>
                <Button className=""><House /></Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
              </PopoverContent>
            </Popover>

            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <DialogFooter>
            <Button className="w-full !rounded-full">Add</Button>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {categories.map((category) => (
        <div key={category.name}>{category.name}
          <button>Edit</button>
          <button onClick={() => handleDelete(category.id)}>Delete</button>
        </div>
      ))}
      <div>
        Wrong data
        <button onClick={() => handleDelete("wrongID")}>Delete</button>
      </div>
    </main>
  );
}
