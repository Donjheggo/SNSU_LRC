"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetAppointments(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("appointments")
      .select(`*, room_id(name)`)
      .order("created_at", { ascending: false })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
      : await query;

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function CreateAppointment(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("appointments")
      .insert({
        room_id: formData.get("room_id"),
        name: formData.get("name"),
        course_and_year: formData.get("course_and_year"),
        date: formData.get("date"),
        purpose: formData.get("purpose"),
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetAppointmentById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return false;
    }
    return data;
  } catch (error) {
    return false;
  }
}

export async function UpdateAppointment(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("appointments")
      .update({
        room_id: formData.get("room_id"),
        name: formData.get("name"),
        course_and_year: formData.get("course_and_year"),
        date: formData.get("date"),
        purpose: formData.get("purpose"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteAppointment(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalAppointments() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("appointments").select("*");

    if (error) {
      console.error(error);
      return 0;
    }
    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
