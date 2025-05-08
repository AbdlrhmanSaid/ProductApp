// app/stands/edit/[id]/page.jsx
import EditStand from "./EditStand";
import CheckAuth from "@/auth/checkAuth";

export default function EditStandPage({ params }) {
  const { id } = params;

  return (
    <CheckAuth>
      <EditStand id={id} />
    </CheckAuth>
  );
}
