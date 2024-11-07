"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetAttendances(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("attendances")
      .select(`*`)
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

export async function CreateAttendance(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("attendances")
      .insert({
        name: formData.get("name"),
        course_and_year: formData.get("course_and_year"),
        id_number: formData.get("id_number"),
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/dashboard/attendances");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetAttendanceById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("attendances")
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

export async function DeleteAttendance(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("attendances").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/dashboard/attendances");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalAttendances() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("attendances").select("*");

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

export async function GetAllAttendance() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("attendances").select("*");

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
