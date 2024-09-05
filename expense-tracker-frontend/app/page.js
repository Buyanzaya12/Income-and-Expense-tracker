"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { categoryColors, categoryIcons } from "./components/data";
import { House, Check } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/Sidebar";
import { RecordDialog } from "@/components/ui/RecordDialog";
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

  function reset() {
    setName("");
    setColor("blue");
    setIcon("home");
    setEditingCategory(null);
  }

  function closeDialog() {
    reset();
    setOpen(false);
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
      .then(() => {
        loadList();
        setLoading(false);
        closeDialog();
        toast("Successfully created.")
      });
  }

  function updateCategory() {
    setLoading(true);
    fetch(`http://localhost:4000/categories/${editingCategory.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        color: color,
        icon: icon,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        loadList();
        setLoading(false);
        closeDialog();
        toast("Successfully updated.")
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
      <Header />
      <Toaster />
      <Button className="bg-blue-400" onClick={() => {
        reset();
        setOpen(true);
      }}>Add new category
      </Button>
      <Sidebar />
      <RecordDialog />
      <Dialog open={open}>
        <DialogContent onClose={closeDialog} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <div className="flex">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="">
                  <CategoryIcon iconName={icon} color={color} />
                </Button>
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
                <Button disabled={loading} className="w-full !rounded-full" onClick={updateCategory}>Update</Button>
              ) :
                (
                  <Button disabled={loading} className="w-full !rounded-full" onClick={createNew}>Add</Button>
                )
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {categories.map((category) => (
        <div key={category.id} className="flex justify-">
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
  const iconObject = categoryIcons.find((item) => item.name === iconName);
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