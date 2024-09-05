import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export function Header() {
    return <header>Header
        <Button onClick={() => router.push(`?create=new`)}>+ Record</Button>
    </header>;
}