package com.example.guideapp.List;

import android.content.Intent;
import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.guideapp.Details.DetailsActivity;
import com.example.guideapp.R;

public class WaterfallsListActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_waterfalls_list);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.list_root), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // Back
        findViewById(R.id.btn_back_list).setOnClickListener(v -> finish());

        // Only Boyana works -> open Details
        Intent detailsIntent = new Intent(WaterfallsListActivity.this, DetailsActivity.class);

        // Make both the card and the button open details (better UX)
        findViewById(R.id.item_boyana).setOnClickListener(v -> startActivity(detailsIntent));
        findViewById(R.id.btn_boyana_details).setOnClickListener(v -> startActivity(detailsIntent));
    }
}