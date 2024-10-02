"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetRooms(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("rooms")
      .select(`*`)
      .order("name", { ascending: false })
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

export async function CreateRoom(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("rooms")
      .insert({
        name: formData.get("name"),
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/dashboard/rooms");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetRoomById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("rooms")
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

export async function UpdateRoom(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("rooms")
      .update({
        name: formData.get("name"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/dashboard/rooms");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteRoom(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("rooms").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/dashboard/rooms");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalRooms() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("rooms").select("*");

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

export async function GetAllRooms() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("rooms").select("*");

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
