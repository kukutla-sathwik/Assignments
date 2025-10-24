import java.util.*;

public class TestCollections {

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("One");
        list.add("Two");
        if (list.size() == 2 && list.contains("Two")) {
            System.out.println("List test passed.");
        } else {
            System.out.println("List test failed.");
        }

        Set<Integer> set = new HashSet<>();
        set.add(5);
        set.add(10);
        set.add(5);
        if (set.size() == 2) {
            System.out.println("Set test passed.");
        } else {
            System.out.println("Set test failed.");
        }

        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.remove("A");
        if (!map.containsKey("A") && map.get("B") == 2) {
            System.out.println("Map test passed.");
        } else {
            System.out.println("Map test failed.");
        }
    }
}
