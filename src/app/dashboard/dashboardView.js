"use client"
import { useEffect, useState } from "react";
import DashboardItem from "./dashboardItemView";

export async function getItemsProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL19}`);
  const items = await res.json();

  return {
      props: {
          items: items || [],
      },
  };
}

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await getItemsProps();
        setItems(result.props.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container-fluid align-items-center justify-content-between">
      <div className="col-12">
        <div className="text-black row p-3 justify-content-center">
        {loading ? <p>Loading...</p> : <DashboardItem items={items} />}
        </div>
      </div>
    </div>
  );
}
