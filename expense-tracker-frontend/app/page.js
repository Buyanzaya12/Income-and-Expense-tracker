"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CategoryDialog from "@/components/CategoryDialog";

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
    }).then((res) => {
      if (res.status === 404) {
        alert("Category not found");
      }
      loadList();
    });
  }

  return (
    <main>
      <Header />
      <Toaster />
      <Button
        className="bg-blue-400"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add new category
      </Button>
      <Sidebar />
      <RecordDialog />
      <CategoryDialog
        open={open}
        onClose={() => setOpen(false)}
        onComplete={loadList}
      />

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
  } else {
    hexColor = colorObject.value;
  }
  const { Icon } = iconObject;
  return <Icon style={{ color: hexColor }} />;
}
