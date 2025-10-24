import java.util.*;

public class Main {

    public static void main(String[] args) {
        System.out.println("---- Java Collections Demo ----");

        // List Example
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Mango");
        fruits.add("Apple"); // duplicate allowed
        System.out.println("\nList Example:");
        System.out.println("All fruits: " + fruits);

        fruits.remove("Banana");
        System.out.println("After removing Banana: " + fruits);

        if (fruits.contains("Mango")) {
            System.out.println("Mango is present in the list.");
        }

        // Set Example
        Set<String> cities = new HashSet<>();
        cities.add("Hyderabad");
        cities.add("Delhi");
        cities.add("Mumbai");
        cities.add("Hyderabad"); // duplicate ignored
        System.out.println("\nSet Example:");
        System.out.println("All cities: " + cities);

        cities.remove("Delhi");
        System.out.println("After removing Delhi: " + cities);

        if (cities.contains("Mumbai")) {
            System.out.println("Mumbai is present in the set.");
        }

        // Map Example
        Map<Integer, String> students = new HashMap<>();
        students.put(1, "Sathwik");
        students.put(2, "Aarav");
        students.put(3, "Meena");
        System.out.println("\nMap Example:");
        System.out.println("All students: " + students);

        students.remove(2);
        System.out.println("After removing roll no 2: " + students);

        if (students.containsKey(3)) {
            System.out.println("Student with roll no 3: " + students.get(3));
        }

        System.out.println("\nAdvantages:");
        System.out.println("List -> Maintains order and allows duplicates.");
        System.out.println("Set -> No duplicates, order not guaranteed.");
        System.out.println("Map -> Stores key-value pairs for quick lookup.");

        System.out.println("\n---- End of Demo ----");
    }
}
